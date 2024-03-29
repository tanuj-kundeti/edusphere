# Generated by Django 4.1.6 on 2023-03-25 02:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('edusphere', '0002_coursesofferedbycycle_masterassignment_mastercourses_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursesofferedbycycle',
            name='courseDescription',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coursesofferedbycycle',
            name='professorId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mastercourses',
            name='cDescription',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='professors',
            name='educationInstitute',
            field=models.CharField(blank=True, default='Massachusetts Institute of Technology', max_length=200, null=True),
        ),
    ]
