# Generated by Django 4.1.6 on 2023-02-17 20:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPersonalDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('uniqueId', models.CharField(blank=True, max_length=100, null=True)),
                ('dateCreated', models.DateTimeField(auto_now_add=True, null=True)),
                ('dateModified', models.DateTimeField(auto_now=True, null=True)),
                ('firstName', models.CharField(blank=True, max_length=100, null=True)),
                ('lastName', models.CharField(blank=True, max_length=100, null=True)),
                ('middleName', models.CharField(blank=True, max_length=250, null=True)),
                ('spouseName', models.CharField(blank=True, max_length=250, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('T', 'TransGender')], max_length=1, null=True)),
                ('ssn', models.CharField(blank=True, max_length=10, null=True)),
                ('apt_no', models.CharField(blank=True, max_length=50, null=True)),
                ('street_address', models.CharField(blank=True, max_length=200, null=True)),
                ('street_address_2', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('zipcode', models.CharField(blank=True, max_length=10, null=True)),
                ('state', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, max_length=50, null=True)),
                ('landmark', models.CharField(blank=True, max_length=100, null=True)),
                ('typeOfAddress', models.CharField(blank=True, choices=[('O', 'Owned'), ('R', 'Rented'), ('C', 'Company Provided')], max_length=1, null=True)),
                ('p_apt_no', models.CharField(blank=True, max_length=50, null=True)),
                ('p_street_address', models.CharField(blank=True, max_length=200, null=True)),
                ('p_street_address_2', models.CharField(blank=True, max_length=200, null=True)),
                ('p_city', models.CharField(blank=True, max_length=100, null=True)),
                ('p_zipcode', models.CharField(blank=True, max_length=10, null=True)),
                ('p_state', models.CharField(blank=True, max_length=100)),
                ('p_country', models.CharField(blank=True, max_length=50, null=True)),
                ('passport_number', models.CharField(blank=True, max_length=20, null=True)),
                ('dl_number', models.CharField(blank=True, max_length=30, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email_address', models.CharField(blank=True, max_length=50, null=True)),
                ('refer_code', models.CharField(blank=True, max_length=100, null=True)),
                ('phone_verified_flag', models.BooleanField(default=False)),
                ('phone_verified_time', models.DateTimeField(blank=True, null=True)),
                ('email_verified_flag', models.BooleanField(default=False)),
                ('email_verified_time', models.DateTimeField(blank=True, null=True)),
                ('userType', models.CharField(blank=True, choices=[('S', 'Student'), ('I', 'Instructor'), ('A', 'Admin'), ('Z', 'SuperAdmin')], max_length=3, null=True)),
                ('companyName', models.CharField(blank=True, max_length=250, null=True)),
                ('alternate_email_address', models.CharField(blank=True, max_length=50, null=True)),
                ('alternate_phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('nationality', models.CharField(blank=True, max_length=100, null=True)),
                ('workExperiance', models.CharField(blank=True, max_length=10, null=True)),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]