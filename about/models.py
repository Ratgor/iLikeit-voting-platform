from django.db import models

# Create your models here.

# RTG:
class Post(models.Model):
    author = models.CharField(max_length=60)
    contact = models.CharField(max_length=300)
    date = models.DateTimeField()
    text = models.TextField()

    def _str_(self):
        return self.text[:512].rsplit(' ', 1)[0]
