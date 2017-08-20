# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20170816_1632'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.CharField(default=b'1', max_length=100, choices=[(b'1', b'Low'), (b'2', b'Medium'), (b'3', b'High')]),
        ),
    ]
