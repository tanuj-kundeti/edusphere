from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(UserPersonalDetails)
admin.site.register(MasterInstitutes)
admin.site.register(MasterDepartments)
admin.site.register(MasterDegrees)
admin.site.register(MasterSemesterYear)
admin.site.register(MasterCourses)
admin.site.register(Professors)
admin.site.register(Students)
admin.site.register(CoursesOfferedByCycle)
admin.site.register(StudentEnrollment)
admin.site.register(MasterAssignment)
admin.site.register(StudentAssignment)
admin.site.register(Announcements)
admin.site.register(DiscussionPosts)
admin.site.register(ChatModel)

