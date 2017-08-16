# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tasks.models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20170816_1642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=0, validators=[tasks.models.validate_priority]),
        ),
    ]
