from django.db import models

# Create your models here.

from django.utils import timezone

# from django_hstore import hstore
# RTG: hstore is not suitable, use jsonfield insted (for sqlite)
from jsonfield import JSONField
# https://medium.com/@raiderrobert/how-to-make-a-webhook-receiver-in-django-1ce260f4efff
# https://stackoverflow.com/questions/38875927/django-hstore-field-in-sqlite
# https://stackoverflow.com/questions/56167659/saving-json-data-to-a-django-model
# https://pypi.org/project/jsonfield/

class WebhookTransaction(models.Model):
    UNPROCESSED = 1
    PROCESSED = 2
    ERROR = 3

    STATUSES = (
        (UNPROCESSED, 'Unprocessed'),
        (PROCESSED, 'Processed'),
        (ERROR, 'Error'),
    )

    date_event_generated = models.DateTimeField()
    date_received = models.DateTimeField(default=timezone.now)
    body = JSONField(null=True, blank=True) # RTG: hstore is not suitable # hstore.SerializedDictionaryField()
    request_meta = JSONField(null=True, blank=True) # RTG: hstore is not suitable # hstore.SerializedDictionaryField()
    status = models.CharField(max_length=250, choices=STATUSES, default=UNPROCESSED)

    #objects = models.Manager() # RTG: hstore is not suitable # hstore.HStoreManager()

    def __unicode__(self):
        return '{0}'.format(self.date_event_generated)


class Message(models.Model):
    date_processed = models.DateTimeField(default=timezone.now)
    webhook_transaction = None # RTG: missed argument # models.OneToOneField(WebhookTransaction)

    team_id = models.CharField(max_length=250)
    team_domain = models.CharField(max_length=250)
    channel_id = models.CharField(max_length=250)
    channel_name = models.CharField(max_length=250)
    user_id = models.CharField(max_length=250)
    user_name = models.CharField(max_length=250)
    text = models.TextField()
    trigger_word = models.CharField(max_length=250)

    def __unicode__(self):
        return '{}'.format(self.user_name)
