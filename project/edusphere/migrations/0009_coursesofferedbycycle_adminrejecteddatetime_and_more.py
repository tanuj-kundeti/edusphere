# Generated by Django 4.1.6 on 2023-04-22 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edusphere', '0008_chatmodel_messagesenderid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursesofferedbycycle',
            name='adminRejectedDateTime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='professors',
            name='educationInstitute',
            field=models.CharField(blank=True, default='Indiana University Bloomington', max_length=200, null=True),
        ),
    ]