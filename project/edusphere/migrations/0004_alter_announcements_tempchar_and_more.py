# Generated by Django 4.1.6 on 2023-03-26 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edusphere', '0003_alter_coursesofferedbycycle_coursedescription_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcements',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='coursesofferedbycycle',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='discussionposts',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='masterassignment',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='mastercourses',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='masterdegrees',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='masterdepartments',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='masterinstitutes',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='mastersemesteryear',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='professors',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='studentassignment',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='students',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='userpersonaldetails',
            name='tempChar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
