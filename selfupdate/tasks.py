# https://medium.com/@raiderrobert/how-to-make-a-webhook-receiver-in-django-1ce260f4efff
from celery.task import PeriodicTask
from celery.schedules import crontab

from .models import Message, WebhookTransaction


class ProcessMessages(PeriodicTask):
    run_every = crontab()  # this will run once a minute
    def run(self, **kwargs):
        unprocessed_trans = self.get_transactions_to_process()
        print('DEBUG 1')
        for trans in unprocessed_trans:
            print('DEBUG 3')
            try:
                self.process_trans(trans)
                trans.status = WebhookTransaction.PROCESSED
                trans.save()

            except Exception:
                print('DEBUG 4')
                trans.status = WebhookTransaction.ERROR
                trans.save()

    def get_transactions_to_process(self):
        print('DEBUG 2')
        return WebhookTransaction.objects.filter(
            event_name__in=self.event_names,
            status=WebhookTransaction.UNPROCESSED
        )
    def process_trans(self, trans):
        print('DEBUG 5')
        return Message.objects.create(
            team_id=trans.body['team_id'],
            team_domain=trans.body['team_domain'],
            channel_id=trans.body['channel_id'],
            user_id=trans.body['user_id'],
            user_name=trans.body['user_name'],
            text=trans.body['text'],
            user_id=trans.body['user_id'],
            trigger_word=trans.body['trigger_word'],
            webhook_transaction=trans
        )
