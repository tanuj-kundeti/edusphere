from rest_framework import serializers
from .models import Announcements,UserPersonalDetails,StudentAssignment

class AnnouncementSerializer(serializers.ModelSerializer):
  dateModified = serializers.DateTimeField(format='%Y-%m-%d')
  class Meta:
    model= Announcements
    fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model= UserPersonalDetails
    fields = '__all__'



class SAssignmentSerializer(serializers.ModelSerializer):
  class Meta:
    model=StudentAssignment
    fields = '__all__'