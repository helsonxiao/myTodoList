from django.db import models
from django.utils import timezone


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=120)
    birthday = models.DateField(default=timezone.now, blank=True)
    deadline = models.DateField(default=timezone.now)
    priority = models.IntegerField(default=0)
    text = models.TextField()
    done = models.BooleanField(default=False, blank=True)
    
    def __unicode__(self):
        return self.title
