# Generated by Django 4.1.6 on 2023-03-26 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edusphere', '0004_alter_announcements_tempchar_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='masterinstitutes',
            name='state',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
