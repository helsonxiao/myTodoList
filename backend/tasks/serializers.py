from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'url', 'title', 'priority', 'done', 'text', 'birthday', 'deadline')
