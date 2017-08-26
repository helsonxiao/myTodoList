from django.db import models
from django.core.exceptions import ValidationError


# Create your models here.
class Task(models.Model):
    LOW = '1'
    MEDIUM = '2'
    HIGH = '3'
    PRIORITY_CHOICES = (
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    )
    priority = models.CharField(choices=PRIORITY_CHOICES, default=LOW, max_length=100)
    content = models.CharField(max_length=120)
    birthday = models.DateField(auto_now_add=True)
    deadline = models.DateField(blank=True, null=True)
    done = models.BooleanField(default=False, blank=True)
    
    def __unicode__(self):
        return self.title
