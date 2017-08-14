# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=120)),
                ('birthday', models.DateField(default=django.utils.timezone.now, blank=True)),
                ('deadline', models.DateField(default=django.utils.timezone.now)),
                ('priority', models.IntegerField(default=0)),
                ('text', models.TextField()),
                ('done', models.BooleanField(default=False)),
            ],
        ),
    ]
