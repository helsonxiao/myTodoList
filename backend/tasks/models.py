from django.db import models
from django.core.exceptions import ValidationError


def validate_priority(value):
    if value not in [1, 2, 3]:
        raise ValidationError("Only three levels for priority. They are 1, 2, 3.")


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=120)
    birthday = models.DateField(auto_now_add=True)
    deadline = models.DateField(blank=True, null=True)
    priority = models.IntegerField(default=0, validators=[validate_priority])
    text = models.TextField()
    done = models.BooleanField(default=False, blank=True)
    
    def __unicode__(self):
        return self.title
