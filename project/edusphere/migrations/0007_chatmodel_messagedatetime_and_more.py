# Generated by Django 4.1.6 on 2023-04-19 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edusphere', '0006_alter_professors_educationinstitute_chatmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmodel',
            name='messageDateTime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursesofferedbycycle',
            name='adminAppprovedDateTime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coursesofferedbycycle',
            name='adminApprovedCourse',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='masterassignment',
            name='assignmentLink',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='masterassignment',
            name='filePath',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='submissionAssignmentLink',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='submissionFilePath',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='professors',
            name='educationInstitute',
            field=models.CharField(blank=True, default='Stanford University', max_length=200, null=True),
        ),
    ]
