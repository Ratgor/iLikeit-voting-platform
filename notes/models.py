from django.db import models

# Create your models here.

# RTG: example from http://v1k45.com/blog/modern-django-part-3-creating-an-api-and-integrating-with-react/
# RTG: example from http://v1k45.com/blog/modern-django-part-4-adding-authentication-to-react-spa-using-drf/

from django.contrib.auth.models import User

class Note(models.Model):
    text = models.TextField(blank=True)
    owner = models.ForeignKey(User,
                              related_name="notes",
                              on_delete=models.CASCADE,
                              null=True,
                              blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    encrypted = models.BooleanField(blank=False, default=True)

    def __str__(self):
        return self.text
