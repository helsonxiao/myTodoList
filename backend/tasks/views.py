from django.shortcuts import render
from .models import Task
from rest_framework import viewsets, filters
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    search_fields = ('title', 'deadline', 'priority', 'text', 'done')
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('done',)

