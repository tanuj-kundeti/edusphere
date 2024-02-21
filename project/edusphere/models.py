from django.db import models
from django.contrib.auth.models import User
from datetime import datetime as dts
import uuid
from django.conf import settings
# from models.JSONField import models.JSONField
import random

# Create your models here.

# class baseModelStructure(models.Model):
#     dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
#     dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
#     # Your columns 
#     isInActive = models.BooleanField(default=False)
#     isInActiveDate = models.DateTimeField(null=True, blank=True)

class UserPersonalDetails(models.Model):
    gender_type_choice = (
        ('M','Male'),
        ('F','Female'),
        ('T','TransGender')
    )
    user_type_choice = (
        ('S', 'Student'),
        ('I', 'Instructor'),
        ('A', 'Admin'),
        ('Z', 'SuperAdmin'),
    )
    typeOfAddress_choice = (
        ('O','Owned'),
        ('R','Rented'),
        ('C', 'Company Provided'),
    )
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    uniqueId = models.CharField(max_length=100,null=True,blank=True)
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    firstName = models.CharField(max_length=100,null=True,blank=True)
    lastName = models.CharField(max_length=100,null=True,blank=True)
    middleName = models.CharField(null=True,blank=True,max_length=250)
    spouseName = models.CharField(max_length=250, blank=True,null=True)
    dob = models.DateField(blank=True,null=True)
    gender = models.CharField(null=True,blank=True,choices=gender_type_choice,max_length=1)
    ssn = models.CharField(null=True,blank=True,max_length=10)
    # 
    apt_no = models.CharField(blank=True,null=True,max_length=50)
    street_address = models.CharField(blank=True,null=True,max_length=200)
    street_address_2 = models.CharField(blank=True,null=True,max_length=200)
    city = models.CharField(blank=True,null=True,max_length=100)
    zipcode = models.CharField(blank=True,null=True,max_length=10)
    state = models.CharField(max_length=100,null=False,blank=True)
    country = models.CharField(blank=True,null=True,max_length=50)
    landmark = models.CharField(max_length=100,null=True,blank=True)
    typeOfAddress = models.CharField(null=True,blank=True, max_length=1, choices=typeOfAddress_choice)
    p_apt_no = models.CharField(blank=True,null=True,max_length=50)
    p_street_address = models.CharField(blank=True,null=True,max_length=200)
    p_street_address_2 = models.CharField(blank=True,null=True,max_length=200)
    p_city = models.CharField(blank=True,null=True,max_length=100)
    p_zipcode = models.CharField(blank=True,null=True,max_length=10)
    p_state = models.CharField(max_length=100,null=False,blank=True)
    p_country = models.CharField(blank=True,null=True,max_length=50)

    passport_number = models.CharField(max_length=20,null=True,blank=True)
    dl_number = models.CharField(max_length=30,null=True,blank=True)
    phone_number = models.CharField(null=True,blank=True,max_length=15)
    email_address = models.CharField(null=True,blank=True,max_length=50)
    refer_code = models.CharField(max_length=100, null=True, blank=True)
    phone_verified_flag = models.BooleanField(default=False)
    phone_verified_time = models.DateTimeField(null=True, blank=True)
    email_verified_flag = models.BooleanField(default=False)
    email_verified_time = models.DateTimeField(null=True, blank=True)
    userType = models.CharField(choices=user_type_choice,null=True,blank=True,max_length=3)
    companyName = models.CharField(max_length=250, null=True, blank=True)
    alternate_email_address = models.CharField(null=True,blank=True,max_length=50)
    alternate_phone_number = models.CharField(null=True,blank=True,max_length=15)

    nationality = models.CharField(blank=True, null=True, max_length=100)

    lastLoginDateTime =  models.DateTimeField(null=True, blank=True)
    lastLogoutDateTime =  models.DateTimeField(null=True, blank=True)

    workExperiance = models.CharField(blank=True,null=True,max_length=10)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)

    def __str__(self):
        return str(self.firstName) + ' ' + str(self.lastName) + ', Type :' + str(self.userType)
    

class MasterInstitutes(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # Your columns 
    instituteName = models.CharField(blank=True,null=True,max_length=100)
    instituteShortHandName = models.CharField(blank=True,null=True,max_length=10)
    directors = models.CharField(blank=True,null=True,max_length=100)       # comma based professors ids
    contactEmail = models.CharField(blank=True,null=True,max_length=50)
    street_address = models.CharField(blank=True,null=True,max_length=200)
    street_address_2 = models.CharField(blank=True,null=True,max_length=200)
    city = models.CharField(blank=True,null=True,max_length=100)
    zipcode = models.CharField(blank=True,null=True,max_length=10)
    state = models.CharField(max_length=100,null=True,blank=True)
    country = models.CharField(blank=True,null=True,max_length=50)
    landmark = models.CharField(max_length=100,null=True,blank=True)
    totalStudentCapacity = models.IntegerField(null=True,blank=True)
    rank = models.IntegerField(null=True,blank=True)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.instituteName) + ' ' + str(self.instituteShortHandName)


class MasterDepartments(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # Your columns 
    instituteId = models.ForeignKey(MasterInstitutes,on_delete=models.CASCADE,null=False,blank=False)
    nameofDepartment = models.CharField(blank=True,null=True,max_length=100)
    shortName = models.CharField(blank=True,null=True,max_length=10)
    departmentHeadUser = models.CharField(blank=True,null=True,max_length=100) # FK to user Professor
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.instituteId.id) + ' ' + str(self.nameofDepartment)


class MasterDegrees(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # Your columns 
    nameofDegree = models.CharField(blank=True,null=True,max_length=100)
    shortName = models.CharField(blank=True,null=True,max_length=10)
    lengthOfDegree = models.IntegerField(null=True,blank=True) # in #of months
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.nameofDegree) + ' ' + str(self.lengthOfDegree)


# Fall 2022, Spring 2023
class MasterSemesterYear(models.Model):
    cycleChoice = (
        ('fa','Fall'),
        ('sp','Spring'),
        ('sm','Summer'),
        ('wn','Winter')
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    cycle = models.CharField(null=True,blank=True, max_length=2, choices=cycleChoice)
    year = models.IntegerField(null=True,blank=True) 
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.cycle) + ' ' + str(self.year)


class MasterCourses(models.Model):
    courseLevelTypeChoice = (
        ('b','Beginner'),
        ('i','Intermidiate'),
        ('a','Advanced')
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # Your columns 
    cName = models.CharField(blank=True,null=True,max_length=100)
    cShortName = models.CharField(blank=True,null=True,max_length=10)
    cDescription = models.JSONField(null=True, blank=True)
    cSyllabusJson = models.JSONField(null=True, blank=True)
    cModulesJson = models.JSONField(null=True, blank=True)
    skillJson = models.JSONField(null=True, blank=True)
    cLevel = models.CharField(null=True,blank=True, max_length=1, choices=courseLevelTypeChoice)

    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.id) + ' ' + str(self.cName) + ' ' + str(self.cLevel)


class Professors(models.Model):
    typeOfProfessorChoice = (
        ('ASP','Assistant Professor'),
        ('ACP','Associate Professor'),
        ('PRF', 'Professor'),
    )
    
    randomEducationInstitute = random.choice(["Harvard University","Massachusetts Institute of Technology","Indiana University Bloomington","Stanford University"])
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    iId = models.ForeignKey(MasterInstitutes,on_delete=models.CASCADE,null=False,blank=False)
    typeOfProfessor = models.CharField(null=True,blank=True, max_length=3, choices=typeOfProfessorChoice)
    joiningDate = models.DateTimeField(null=True, blank=True)
    domainInterests = models.CharField(blank=True,null=True,max_length=100)
    biography = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci phasellus egestas tellus rutrum tellus pellentesque. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Senectus et netus et malesuada. In pellentesque massa placerat duis ultricies lacus sed. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Urna cursus eget nunc scelerisque viverra mauris in aliquam.")
    educationInstitute = models.CharField(blank=True,null=True,max_length=200,default=randomEducationInstitute)
    yearsOfworkEx = models.IntegerField(null=True,blank=True,default=11)
    portfolioLink = models.CharField(blank=True,null=True,max_length=100)
    linkedInLink = models.CharField(blank=True,null=True,max_length=100)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + ' ' + str(self.typeOfProfessor)

class Students(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    iId = models.ForeignKey(MasterInstitutes,on_delete=models.CASCADE,null=False,blank=False)
    dId = models.ForeignKey(MasterDegrees,on_delete=models.CASCADE,null=False,blank=False)
    sId = models.ForeignKey(MasterSemesterYear,on_delete=models.CASCADE,null=False,blank=False)
    onboardingDate = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    isGraduated = models.BooleanField(default=False)
    isGraduatedDate = models.DateTimeField(null=True, blank=True)
    biography = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci phasellus egestas tellus rutrum tellus pellentesque. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Senectus et netus et malesuada. In pellentesque massa placerat duis ultricies lacus sed. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Urna cursus eget nunc scelerisque viverra mauris in aliquam.")
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + ' ' + str(self.dId.id)

class CoursesOfferedByCycle(models.Model):
    courseLevelTypeChoice = (
        ('b','Beginner'),
        ('i','Intermidiate'),
        ('a','Advanced')
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # Your columns 
    courseId = models.ForeignKey(MasterCourses,on_delete=models.CASCADE,null=False,blank=False)
    # Fk to MasterSemesterYear
    sId = models.ForeignKey(MasterSemesterYear,on_delete=models.CASCADE,null=False,blank=False)
    # Fk to MasterDepartments
    dId = models.ForeignKey(MasterDepartments,on_delete=models.CASCADE,null=False,blank=False)
    # Fk to Instructors
    professorId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    courseName = models.CharField(blank=True,null=True,max_length=100)
    courseShortName = models.CharField(blank=True,null=True,max_length=10)
    courseDescription = models.JSONField(null=True, blank=True)
    courseSyllabusJson = models.JSONField(null=True, blank=True)
    courseModulesJson = models.JSONField(null=True, blank=True)
    skillJson = models.JSONField(null=True, blank=True)
    courseLevel = models.CharField(null=True,blank=True, max_length=1, choices=courseLevelTypeChoice)
    startDate = models.DateTimeField(null=True, blank=True)
    endDate = models.DateTimeField(null=True, blank=True)
    adminApprovedCourse = models.BooleanField(default=False)
    adminAppprovedDateTime = models.DateTimeField(null=True, blank=True)
    adminRejectedDateTime = models.DateTimeField(null=True, blank=True)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        up = UserPersonalDetails.objects.get(userId = self.professorId)
        profName = str(up.firstName) + " " + str(up.lastName)
        return str(self.courseId.cName) + ' - ' + str(self.sId.id) + ' - ' + str(self.dId.id) + ' - ' + str(profName) + " - "+ str(self.courseName) + " - "+ str(self.courseShortName)

class StudentEnrollment(models.Model):
    gradeChoice = (
        ('A+','A+'),
        ('A','A'),
        ('A-','A-'),
        ('B+','B+'),
        ('B','B'),
        ('B-','B-'),
        ('C+','C+'),
        ('C','C'),
        ('C-','C-'),
        ('F','F'),
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    cId = models.ForeignKey(CoursesOfferedByCycle,on_delete=models.CASCADE,null=False,blank=False)
    enrollmentDate = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    grade = models.CharField(null=True,blank=True, max_length=2, choices=gradeChoice)
    isGraduated = models.BooleanField(default=False)
    isGraduatedDate = models.DateTimeField(null=True, blank=True)
    isDropped = models.BooleanField(default=False)
    isDropedDate = models.DateTimeField(null=True, blank=True)
    biography = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci phasellus egestas tellus rutrum tellus pellentesque. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Senectus et netus et malesuada. In pellentesque massa placerat duis ultricies lacus sed. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Urna cursus eget nunc scelerisque viverra mauris in aliquam.")
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + ' ' + str(self.cId.id)


class MasterAssignment(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    cId = models.ForeignKey(CoursesOfferedByCycle,on_delete=models.CASCADE,null=False,blank=False)
    assingnmentNumber = models.IntegerField(null=True,blank=True,default=1)
    assingnmentTitle = models.CharField(blank=True,null=True,max_length=100)
    maxPoints = models.IntegerField(null=True,blank=True,default=100)
    publishedDate = models.DateTimeField(null=True, blank=True)
    filePath = models.CharField(max_length=1000,null=True,blank=True)
    assignmentLink = models.CharField(max_length=1000,null=True,blank=True)
    dueDate = models.DateTimeField(null=True, blank=True)
    description = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis eu. Morbi tempus iaculis urna id volutpat lacus laoreet. Eu sem integer vitae justo eget magna fermentum. Gravida neque convallis a cras semper auctor. Turpis in eu mi bibendum neque egestas congue. Ut etiam sit amet nisl purus in. Varius sit amet mattis vulputate enim nulla aliquet. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Cras fermentum odio eu feugiat pretium. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim.")
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.assingnmentNumber) + '| cId : ' + str(self.cId.id) + "| title : " + str(self.assingnmentTitle)


class StudentAssignment(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    cId = models.ForeignKey(CoursesOfferedByCycle,on_delete=models.CASCADE,null=False,blank=False)
    aId = models.ForeignKey(MasterAssignment,on_delete=models.CASCADE,null=False,blank=False)
    submissionFilePath = models.CharField(max_length=1000,null=True,blank=True)
    submissionAssignmentLink = models.CharField(max_length=1000,null=True,blank=True)
    isSubmitted = models.BooleanField(default=False)
    isSubmittedDate = models.DateTimeField(null=True, blank=True)
    maxPoints = models.IntegerField(null=True,blank=True,default=100)
    receivedPoints = models.IntegerField(null=True,blank=True,default=100)
    gradeReceivedDate = models.DateTimeField(null=True, blank=True)
    commentsJson = models.JSONField(null=True, blank=True)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + '| cId : ' + str(self.cId.id) + '| aId : ' + str(self.aId.id)


class Announcements(models.Model):
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # ProfessorId
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    cId = models.ForeignKey(CoursesOfferedByCycle,on_delete=models.CASCADE,null=False,blank=False)
    title = models.CharField(blank=True,null=True,max_length=100)
    description = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis eu. Morbi tempus iaculis urna id volutpat lacus laoreet. Eu sem integer vitae justo eget magna fermentum. Gravida neque convallis a cras semper auctor. Turpis in eu mi bibendum neque egestas congue. Ut etiam sit amet nisl purus in. Varius sit amet mattis vulputate enim nulla aliquet. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Cras fermentum odio eu feugiat pretium. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim.")
    noOfViews = models.IntegerField(null=True,blank=True,default=0)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + ' ' + str(self.cId.id) + ' '+ str(self.noOfViews)

class DiscussionPosts(models.Model):
    typeOfPostChoice = (
        ('n','New Post'),
        ('r','Reply'),
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    # StudentId or ProfessorId
    userId = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    title = models.CharField(blank=True,null=True,max_length=100)
    description = models.TextField(null=True, blank=True, default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis eu. Morbi tempus iaculis urna id volutpat lacus laoreet. Eu sem integer vitae justo eget magna fermentum. Gravida neque convallis a cras semper auctor. Turpis in eu mi bibendum neque egestas congue. Ut etiam sit amet nisl purus in. Varius sit amet mattis vulputate enim nulla aliquet. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Cras fermentum odio eu feugiat pretium. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim.")
    noOfViews = models.IntegerField(null=True,blank=True,default=0)
    typeOfPost = models.CharField(null=True,blank=True, max_length=1, choices=typeOfPostChoice)
    maintThreadId = models.CharField(null=True,blank=True,max_length=50)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.userId.id) + ' ' + str(self.title) + ' '+ str(self.noOfViews)
    

class ChatModel(models.Model):
    userIdChoice = (
        ('user1','u1'),
        ('user2','u2'),
    )
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True, auto_now=True)
    threadId = models.CharField(max_length=10,null=True,blank=True)
    userId1 = models.ForeignKey(User, related_name='user_id_1', on_delete=models.CASCADE,null=False,blank=False)
    userId2 = models.ForeignKey(User, related_name='user_id_2', on_delete=models.CASCADE,null=False,blank=False)
    message = models.TextField(null=True, blank=True)
    messageDateTime = models.DateTimeField(null=True, blank=True)
    messageSenderId = models.CharField(max_length=100,null=True,blank=True)
    senderId =  models.CharField(null=True,blank=True, max_length=5, choices=userIdChoice)
    isInActive = models.BooleanField(default=False)
    isInActiveDate = models.DateTimeField(null=True, blank=True)
    tempChar = models.CharField(max_length=100,null=True,blank=True)
    tempInt = models.IntegerField(null=True,blank=True)
    tempJson = models.JSONField(null=True, blank=True)
    def __str__(self):
        return str(self.threadId) + " " +str(self.userId1.id) + ' ' + str(self.userId2.id) + ' '+ str(self.message) + ' '+ str(self.messageDateTime)