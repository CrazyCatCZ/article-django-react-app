# Generated by Django 3.0.8 on 2020-09-28 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20200927_1919'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='date',
        ),
        migrations.AddField(
            model_name='message',
            name='messaged',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
