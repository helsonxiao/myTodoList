# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tasks.models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20170816_1632'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=0, validators=tasks.models.validate_priority),
        ),
    ]
