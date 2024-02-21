
from django.shortcuts import render
# from rest_framework import generics
from django.http import HttpResponse
# from .models import lms
from uuid import UUID
from django.conf import settings
from django.core.mail import send_mail
import json
from django.contrib.auth.models import User
from edusphere.models import UserPersonalDetails
from edusphere.models import Announcements
from django.http import JsonResponse
from datetime import datetime as dts
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.contrib.auth import authenticate, login, logout
from edusphere.Utilities import Utilities
from edusphere.models import StudentEnrollment, CoursesOfferedByCycle, Professors,StudentAssignment,MasterAssignment
from django.http import JsonResponse
from django.core.serializers import serialize
from .serializers import AnnouncementSerializer,ProfileSerializer,SAssignmentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password

# from .azure_file_controller import ALLOWED_EXTENSIONS,upload_file_to_blob
# from azure.identity import DefaultazureCredential 
from azure.keyvault.secrets import SecretClient
from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .models import MasterAssignment, CoursesOfferedByCycle
from django.db import connection
from dateutil.parser import parse
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os
from datetime import date,datetime
import pytz
from rest_framework import filters
import traceback
import sys
from edusphere.apis import *
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from io import BytesIO
from azure.storage.blob import BlobServiceClient
# from PyPDF2 import PdfFileReader
from django.http import HttpResponse
from django.core import serializers
import random
# from .azure_file_controller import ALLOWED_EXTENSIONS,upload_file_to_blob
# from azure.identity import DefaultazureCredential 
# from azure.keyvault.secrets import SecretClient


#Intialize Azure Credentials
# default_credential=DefaultazureCredential()

#Create secret client
# secret_client=SecretClient(vault_url="https://edusphere.vault.azure.net/",credential=default_credential)



def handle404(request):
    return render(request, 'STATIC/pageNotFound.html', {})

def homeview(request):
    return render(request, './edusphere/index.html', {})

def api(self):
    msg = "Hi Hello, welcome to api"
    return HttpResponse(msg, content_type='text/plain')

def test(self):
    print("In here")

    msg = "Hi Hello Team, welcome to the API"
    return HttpResponse(msg, content_type='text/plain')


def testjson(self):
    print("In here")

    msg = "Hi Hello Team, welcome to the JsonAPI"
    return JsonResponse({'Status':'Success', 'msg' : msg})


def testAPI(self):
	response = Utilities().getErrorUsers()
	return JsonResponse({'Status':'Success', 'response' : response})

 




@csrf_exempt
def SignupUser(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			email = body['email'].lower()
			password = body['password']
			fname = body['fname']
			lname =body['lname']
			typeOfUser = body["type"]

			if typeOfUser == "I" or typeOfUser == "i":
				typeOfUser = "I"
			else:
				typeOfUser = "S"


			if  (password =='' or len(password) < 6):
				return JsonResponse({'Status' : 'Failed','msg': "Please enter atleast 6 character long password"})
			if User.objects.filter(username=email).exists():
				return JsonResponse({'Status' : 'Failed','msg': 'This email is already registered'})
			# if UserPersonalDetails.objects.filter(phoneNumber=phone).exists():
			# 	return JsonResponse({'Status' : 'Failed','msg': 'This phone is already registered'})

			user, created = User.objects.get_or_create(
				username = email,
				first_name = fname,
				last_name = lname,
				email = email,
				password = make_password(password)
			)
			user = User.objects.get(username = user)
			uniqueId = str(dts.now().year) + str(user.id).zfill(8)

			userDetail, created = UserPersonalDetails.objects.get_or_create( userId = user)
			userDetail.userId = user
			
			userDetail.firstName = fname
			userDetail.lastName = lname
			userDetail.email_address = email
			userDetail.uniqueId = uniqueId
			userDetail.dateModified = dts.now()
			userDetail.alternate_email_address = email
			userDetail.userType = typeOfUser
            # uuid = models.UUIDField(default=uuid.uuid4, editable=False)
			if type == "s":
				userDetail.userType = 'S'
				s = Students()
				s.userId = user
				s.iId = MasterInstitutes.objects.get(id = 1)
				s.onboardingDate = dts.now()
				s.dId = MasterDegrees.objects.get(id = 1)
				s.sId = MasterSemesterYear.objects.get(id = 2)
				s.save()
			elif type == "i":
				userDetail.userType = 'I'
				p = Professors()
				p.userId = user
				p.iId = MasterInstitutes.objects.get(id = 1)
				p.typeOfProfessor = "ASP" or "ACP"
				p.joiningDate = dts.now()
				p.save()
			userDetail.save()
			if email:
				subject = 'Signed Up Successfully'
				email_from = settings.EMAIL_HOST_USER
				content = "\nYou have signed up successfully to Edusphere.\n Please login in. "
				recipient_list = [email]
				send_mail( subject, content, email_from, recipient_list )
				return JsonResponse({'Status':'Success', 'Message' : 'The details are sent to your email'})

			else:
				return JsonResponse({'Status':'Failed', 'Message' : 'User does not exists, please contact support'})
			# return JsonResponse({'Status':'Success', 'Message': 'Registration Successful, Please login', "TypeOfUser" : typeOfUser})
			# else:
			# 	return JsonResponse({'Status':'Registration Unsuccessful. Please contact support team.'})
		except User.DoesNotExist:
			return JsonResponse({'Status':'Failed','Message': 'User does not exist'})
		except Exception as e:
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})






@csrf_exempt
def LoginUser(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
		 	#return JsonResponse({'Status':body['email']})
			username = body['email'].lower()
			password = body['password']
			user = authenticate(request, username=username, password=password)
			if user is not None:
				if user.is_active:
					login(request, user)
					up = UserPersonalDetails.objects.get(userId = request.user)
					fullName = str(up.firstName) +" "+ str(up.lastName)
					up.lastLoginDateTime = dts.now()
					up.save()
					return JsonResponse({
							'Status':'Success',
							'userType' : str(up.userType),
							'userId' : str(up.userId.username),
							'userFullName' : fullName,
							'Message': 'Login Successful',
						})
				else:
					return JsonResponse({'Status': "Failed", "Message" : "User is not active, please contact support"})
			else:
				return JsonResponse({'Status':'Failed', "Message" : "Username and password is not matched please check again"})
		except Exception as e:
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	


@csrf_exempt
def Logout(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
		 	#return JsonResponse({'Status':body['email']})
			username = body['username'].lower()
			up = UserPersonalDetails.objects.get(userId__username = username)
			up.lastLogoutDateTime = dts.now()
			up.save()
			logout(request)
			
			return JsonResponse({'Status':'Success', 'Message': 'Logout Successful'})
		except Exception as e:
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})




#Professors creates courses
@csrf_exempt
def createOrUpdateNewCourse(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			# userId = body.get('userId')	
			username = body.get('username')
			user = User.objects.get(username = username)
			userId = user.id
			masterCourseId = body.get('masterCourseId','')	
			semId = body.get('semId',8)	
			departmentId = body.get('departmentId',1)	
			courseName = body.get('name','')
			courseShortName = body.get('shortName','')
			description = body.get('description','')
			syllabus = body.get('syllabus','')
			modules = body.get('modules','')
			skillJson = body.get('skillJson','')
			courseLevel =  body.get('cLevel','')
			courseStartDate =  body.get('startDate','')	
			courseEndDate =  body.get('endDate','')
			checkIfMasterCourseExists = MasterCourses.objects.filter(id = masterCourseId).exists()
			type = Utilities().getTypeOfUser(userId)
			if type.lower() == "i" and checkIfMasterCourseExists:
				masterCourseData = MasterCourses.objects.filter(id = masterCourseId)[0]
				professorId = User.objects.get(id = userId)
				semesterYearId = MasterSemesterYear.objects.get(id = semId)
				departmentId = MasterDepartments.objects.get(id = departmentId)

				c, created = CoursesOfferedByCycle.objects.get_or_create(
						courseId = masterCourseData,
						sId = semesterYearId,
						dId = departmentId,
						professorId = professorId,
					)
				c.courseName = courseName if courseName else masterCourseData.cName
				c.courseShortName = courseShortName if courseShortName else masterCourseData.cShortName
				c.courseDescription = description if description else masterCourseData.cDescription
				c.courseModulesJson = modules if modules else masterCourseData.cModulesJson
				c.courseSyllabusJson = syllabus if syllabus else masterCourseData.cSyllabusJson
				c.skillJson = skillJson if skillJson else masterCourseData.skillJson
				c.courseLevel = courseLevel if courseLevel else "b"
				c.startDate = dts.strptime(courseStartDate, '%Y-%m-%d').date()
				c.endDate = dts.strptime(courseEndDate, '%Y-%m-%d').date()
				c.save()

				return JsonResponse({'Status':'Success',
			 						  "Message": "The given data in added/updated in the database",
									  "NewCourse" : created,
									  "UpdatedCourse" : not created
									})
			elif not checkIfMasterCourseExists:
				return JsonResponse({'Status':'Failed',"Message": "The given Master Course does not exists in the system."})
			elif type != "I":
				return JsonResponse({'Status':'Failed',"Message": "The given user has no permission to create or update course"})

		except Exception as e:
			traceback_var = traceback.print_exc()
			print(" Traceback :", traceback_var)
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})








#Enroll Student into courses
@csrf_exempt
def studentEnrollCourse(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			username = body.get('username',0)
			courseId = body.get('courseId',0)
			username = username.lower()
			u = User.objects.get(username = username)
			courseExists = CoursesOfferedByCycle.objects.filter(id = courseId).exists()
			type = Utilities().getTypeOfUser(u.id)
			if courseExists:
				if type == "S":
					u = User.objects.get(username = username)
					c = CoursesOfferedByCycle.objects.filter(id = courseId)[0]
					if StudentEnrollment.objects.filter(userId = u, cId = c).exists():
						return JsonResponse({'Status':'FAILED',"Message": "This user is already enrolled in the given course."})

					s = StudentEnrollment()
					s.userId = u
					s.cId = c
					s.enrollmentDate = dts.now()
					s.save()
					return JsonResponse({'Status':'Success',"Message": "Student enrolled the course sucessfully"})
				else:
					return JsonResponse({'Status':'Failed',"Message": "This user does nto have permission to enroll given course."})
			else:
				return JsonResponse({'Status':'Failed',"Message": "The given courseId doesn't match, please check cid again"})
		except Exception as e:
				return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})







def getMyCoursesMethod(request):
	if request.method == "GET":
		username = request.GET.get('username')
		user = User.objects.get(username=username)
		if user.is_authenticated:
			type = Utilities().getTypeOfUser(user.id)
			requestedCourses = []
			if type == "S":
				enrollments = StudentEnrollment.objects.filter(userId__id=user.id)
				for i in enrollments:
					# u = UserPersonalDetails.objects.get(userId = i.userId)
					p = UserPersonalDetails.objects.get(userId = i.cId.professorId.id) 
					obj = {}
					obj["courseId"] = i.cId.id
					obj["masterCourseId"] = i.cId.courseId.id
					obj["courseName"] = i.cId.courseName
					obj["shortName"] = i.cId.courseShortName
					obj["courseDescription"] = i.cId.courseDescription
					obj["courseLevel"] = i.cId.courseLevel
					obj["courseSyllabus"] = i.cId.courseSyllabusJson
					obj["professorName"] =  str(p.firstName) +" " + str(p.lastName)
					obj["syllabus"] = i.cId.courseSyllabusJson
					obj["modules"] = i.cId.courseModulesJson
					obj["skillJson"] = i.cId.skillJson
					obj["cLevel"] = i.cId.courseLevel
					obj["startDate"] = i.cId.startDate
					obj["endDate"] = i.cId.endDate
					requestedCourses.append(obj)

			elif type.lower() == "i":
				courses = CoursesOfferedByCycle.objects.filter(professorId__id=user.id, isInActive = False, adminApprovedCourse = True)
				for i in courses:
					print(i)
					u = UserPersonalDetails.objects.get(userId = i.professorId)
					obj = {}
					obj["courseId"] = i.id
					obj["masterCourseId"] = i.courseId.id
					obj["courseName"] = i.courseName
					obj["shortName"] = i.courseShortName
					obj["courseDescription"] = i.courseDescription
					obj["courseLevel"] = i.courseLevel
					obj["courseSyllabus"] = i.courseSyllabusJson
					obj["professorName"] = "Prof. "+ str(u.firstName) +" " + str(u.lastName)
					obj["syllabus"] = i.courseSyllabusJson
					obj["modules"] = i.courseModulesJson
					obj["skillJson"] = i.skillJson
					obj["cLevel"] = i.courseLevel
					obj["startDate"] = i.startDate
					obj["endDate"] = i.endDate
					requestedCourses.append(obj)

			return JsonResponse({'Status':'Success',"requestedCourses" : requestedCourses, 
									"Message": "My courses are fetched for the given userId"})

		else:
			return JsonResponse({'Status':'Failed',"Message": "user is not authenticated"})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})






#working User is able to get the values and can update the params
@csrf_exempt
@api_view(['GET','POST','PUT'])
def userProfile(request):
	if request.method=="GET":
			username = request.GET.get('userId') or request.user.id
		# if request.user.is_authenticated:
			p_data=UserPersonalDetails.objects.get(userId__username=username)
			serializer=ProfileSerializer(p_data)
			return JsonResponse(serializer.data)
	if request.method == "PUT":
			username = request.GET.get('userId')
		# if request.user.is_authenticated:
			p_data=UserPersonalDetails.objects.get(userId__username=username)
			serializer=ProfileSerializer(p_data,data=request.data)
			if serializer.is_valid():
				serializer.save()
				return JsonResponse(serializer.data)
	return JsonResponse(serializer.errors, status= status.HTTP_400_BAD_REQUEST)







@csrf_exempt
@api_view(['GET','POST','PUT'])
def getAllAnnouncements(request):
	if request.method=="GET":
			username = request.GET.get('username') or request.user.id
		# if request.user.is_authenticated:
			retjson=[]
			# print(request.user.email)
			# body_unicode = request.body.decode('utf-8')
			# body = json.loads(body_unicode)
			# username = body['username']
			user_val=UserPersonalDetails.objects.get(userId__username=username)
			user_id=user_val.userId_id
			type = user_val.userType
			if type=="s" or type=="S":
				p_data=StudentEnrollment.objects.filter(userId_id__id=user_id)
				for val in p_data:
					anns=Announcements.objects.filter(cId_id=val.cId).order_by("-id")
					course=CoursesOfferedByCycle.objects.get(id=val.cId.id)
					for a in anns:

						obj={}
						obj["Title"]=a.title
						obj["Description"]=a.description
						obj["Date"]=a.dateCreated.strftime("%m/%d/%y")
						obj["Course"]=course.courseName
						retjson.append(obj)

			elif type=="i" or type=="I":
				cids=CoursesOfferedByCycle.objects.filter(professorId__username=username).values_list("id",flat=True)
				for c in cids:
					ann=Announcements.objects.filter(cId__id=c)
					for a in ann:
						obj={}
						obj["Title"] = a.title
						obj["Description"]=a.description
						obj["Date"] = a.dateCreated.strftime("%d-%m-%Y")
						cId=a.cId_id
						if cId:
							val= CoursesOfferedByCycle.objects.get(id=cId)
							obj["Course"]=val.courseName
						retjson.append(obj)
			return JsonResponse({'response':retjson})
	else:
		return JsonResponse({'Ouput':'Could not get Announcements'})

@csrf_exempt
@api_view(['GET','POST','PUT'])
def getAnnouncementByCourse(request,id):
	if request.method=="GET":
		# if request.user.is_authenticated:
			retjson=[]
			username = request.GET.get('username')
			user_val=UserPersonalDetails.objects.get(userId__username=username)
			user_id=user_val.userId_id
			type = Utilities().getTypeOfUser(user_id)
			print(user_id,id)
			print(type)
			if type =="S" or type =="s":
				retjson=[]
				p_data=StudentEnrollment.objects.filter(userId_id__id=user_id)
				if p_data:
					anns=Announcements.objects.filter(cId_id=id)
					course=CoursesOfferedByCycle.objects.get(id=id)
					for a in anns:

							obj={}
							obj["Title"]=a.title
							obj["Description"]=a.description
							obj["Date"]=a.dateCreated
							obj["Course"]=course.courseName
							retjson.append(obj)
				return JsonResponse({'Announcements':retjson})
			elif type == "I" or type =="i":
				retjson=[]
				p_data=CoursesOfferedByCycle.objects.filter(professorId_id__id=user_id)
				if p_data:
					anns=Announcements.objects.filter(cId_id=id)
					course=CoursesOfferedByCycle.objects.get(id=id)
					for a in anns:
						obj={}
						obj["Title"]=a.title
						obj["Description"]=a.description
						obj["Date"]=a.dateCreated
						obj["Course"]=course.courseName
						retjson.append(obj)
				return JsonResponse({'Announcements':retjson})
	else:
		return JsonResponse({'Ouput':'Could not get Announcements'})




@csrf_exempt
def createAnn(request,id):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			username = body.get('username')
			user = User.objects.get(username = username)
			userId = user.id	
			cId = id	
			title = body.get('title','')
			description = body.get('description','')
			noOfViews = body.get('noOfViews','')
			isInActive = body.get('isInActive','')
			isInActiveDate = body.get('isInActiveDate','')
			tempChar = body.get('tempChar','')
			tempInt =  body.get('tempInt','')
			tempJson =  body.get('tempJson','')	
			a=Announcements()
			a.cId_id=cId
			a.title=title
			a.description=description
			a.userId_id=userId
			a.save()
			return JsonResponse({'Status':'Success',"Message": "Announcement created sucessfully"})
		except:
			return HttpResponse("Error")
	else:
		return JsonResponse("Not Saving")
	




@csrf_exempt
@api_view(['GET','POST','PUT'])
def eachAnnouncement(request,id):
	if request.method=="GET":
		# if request.user.is_authenticated:
			retjson=[]
			# print(request.user.email)
			p_data=list(Announcements.objects.filter(userId_id__id=request.user.id))
			for val in p_data:
				if val.id==id:
					serializer=AnnouncementSerializer(val)
					retjson.append(serializer.data)
			return JsonResponse({"Announcements":retjson})

	if request.method == "PUT":
		# if request.user.is_authenticated:
			p_data=list(Announcements.objects.filter(userId_id__id=request.user.id))
			for val in p_data:
				if val.id==id:
					serializer=AnnouncementSerializer(val,data=request.data)
					if serializer.is_valid():
						serializer.save()
						return JsonResponse(serializer.data)
	return JsonResponse(serializer.error,status=status.HTTP_400_BAD_REQUEST)







@csrf_exempt
def getUserDue(request):
	if request.method=="GET":
		# if request.user.is_authenticated:
			cids = StudentEnrollment.objects.filter(userId__id = request.user.id).values_list("cId__id",flat=True)
			output = []
			for c in cids:
				ma = MasterAssignment.objects.filter(cId__id = c)
				for a in ma:
					obj = {}

					today = date.today()

					day =(a.dueDate)
					if day.year - today.year >=0:
						if day.month - today.month >=0:
							if day.day -today.day >0:
								print(a.assingnmentTitle)
					
								obj["assignmentTitle"] = a.assingnmentTitle
								obj["dueDate"] = a.dueDate.strftime("%d-%m-%Y")
								cId=a.cId_id
								if cId:
									val= CoursesOfferedByCycle.objects.get(id=cId)
									obj["courseName"]=val.courseName
								output.append(obj)


			return JsonResponse({"Due Date":output})
		
def getAllCoursesMethod(request):
	if request.method == "GET":

		response = getAllCoursesAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	

@csrf_exempt
def getMyCoursesProfessorMethod(request):
	if request.method == 'GET':
		username = request.GET.get('username')
		response = getAllCourseProfessorAPI(username)
		return JsonResponse({
					"Status": "Success",
					"Message" : "Fetched required data",
					"response": response,
					}, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


def getAllCurrentSemesterAvailbleCoursesMethod(request):
	if request.method == "GET":

		response = getAllCurrentSemesterAvailbleCoursesMethodAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    })
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})

def getAllInstitutesMethod(request):
	if request.method == "GET":

		response = getAllInstitutesAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


def getAllUsersMethod(request):
	if request.method == "GET":

		response = getAllUsersAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	

def getAllStudentsMethod(request):
	if request.method == "GET":

		response = getAllStudentsAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	

def getAllProfessorsMethod(request):
	if request.method == "GET":

		response = getAllProfessorsAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


def getAllSemestersMethod(request):
	if request.method == "GET":

		response = getAllSemestersAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


def getAllDegreesMethod(request):
	if request.method == "GET":

		response = getAllDegreesAPI()
		return JsonResponse({
                    "Status": "Success",
		    		"Message" : "Fetched required data",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})






@csrf_exempt
def RecoverAccount(request):
	if request.method == 'POST':
		try:
			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			username = body['username'].lower()
			try:
				user = User.objects.get(username=username)
			except:
				return JsonResponse({'Status':'Failed', 'Message' : 'This email is not registered'})

			my_uuid = UserPersonalDetails.objects.get(userId=user).uuid
			# my_uuid=UUID(uuid_val).hex

			url = "https://edusphere-lms.netlify.app/"

			# if User.objects.filter(email=email).exists():
			if username:
				subject = 'Password Reset Mail Edusphere'
				email_from = settings.EMAIL_HOST_USER
				content = "\nYou have just requested an account recovery please click on below link to reset password {url}{my_uuid}&username={username}".format(url= url+"api/recover_confirm/?id=", my_uuid=str(my_uuid), username=username)
				recipient_list = [username]
				send_mail( subject, content, email_from, recipient_list )
				return JsonResponse({'Status':'Success', 'Message' : 'The details are sent to your email'})

			else:
				return JsonResponse({'Status':'Failed', 'Message' : 'User does not exists, please contact support'})
		except Exception as e:
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})







@csrf_exempt
def ResetPasswordConfirm(request):
	if request.method == 'PUT':
		try:
			username = request.GET.get('username').lower()
			uid = request.GET.get('id')

			user = User.objects.get(username=username)

			body_unicode = request.body.decode('utf-8')
			body = json.loads(body_unicode)
			password = body['password']

			if(password =='' or len(password) < 8):
				return JsonResponse({'Status':'Failed', 'Message' : "Please enter 8 character long password"})

			
			if  password:
				user.set_password(password)
				user.is_active = True
				user.save()
				return JsonResponse({'Status':'Success', 'Message' : "Password Changed successfully"})

			else:
				return JsonResponse({'Status':'Failed', 'Message' : "The password reset link is not valid"})

			#User.objects.get(email=username)[0].update(password=password)

		except Exception as e:
			return JsonResponse({'Status':'Failed', 'Message' : 'Exception occured as '+str(e)})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})







def searchCourse(request):

	q=request.GET.get('q') if request.GET.get('q')!=None else ''
	retjson=[]

	if request.method == "GET":
		# if request.user.is_authenticated:
			sval=CoursesOfferedByCycle.objects.filter(Q(courseName__icontains=q) | Q(courseLevel__icontains=q))

			for s in sval:
				obj={}
				obj['name']=s.courseName
				obj['level']=s.courseLevel
				obj['id']=s.courseId_id
				retjson.append(obj)
			
			return JsonResponse({"val":retjson},safe=False)
		# else:
		# 	return JsonResponse({"Error": "user is not authenticated"},safe=False)
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	
#get the course by it's id
@csrf_exempt
def getCoursemethod(request,id):
	if request.method == "GET":
		print(id)
		print(request)
		#if request.user.is_authenticated:
		response = getCourseAPI(id)
		return JsonResponse({"Error": "NA","response": response,}, safe=False)
		#else:
			#return JsonResponse({"Error": "user is not authenticated"},safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})

@csrf_exempt
def gradeAssignmentMethod(request):
	response={}
	if request.method == "POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		userid = body['userid']
		assignmentId = body['assignmentId']
		courseId = body['courseId']
		points = body['points']
		comments=body['comments']
		points=int(points)
		if StudentAssignment.objects.filter(userId=userid, aId__assingnmentNumber=assignmentId,cId=courseId,isSubmitted=True).exists():
			assignment = StudentAssignment.objects.get(userId=userid,aId__assingnmentNumber=assignmentId,cId=courseId,isSubmitted=True)
			if (points<=assignment.maxPoints):
				assignment.receivedPoints=points #updated the received points field
				#assignment.gradeReceivedDate=datetime.date.today(); #updated graded date to the current time 
				assignment.gradeReceivedDate=dts.now()  #updated graded date to the current time 
				assignment.commentsJson=comments
				assignment.tempChar=comments[:80]

				assignment.save()
				response["receivedPoints"] = points
				response["Message"] = "Successfuly assigned points"
			else:
				response["Error message"] = "Assigned points is greater than max points for the assignment"
				return JsonResponse({"Status": "Failed","response": response,}, safe=False)
		else:
			response["Error message"] = "Record not found"
			return JsonResponse({"Status": "Failed","response": response,}, safe=False)
		return JsonResponse({"Status":"Success", "response": response,})
	else:
		return JsonResponse({"Status": "NA","response": response,}, safe=False)

#student checks their grades
@csrf_exempt
def studentlistgradeMethod(request):
	if request.method == "GET":
		username =  request.GET.get('username')
		user = User.objects.get(username=username)
		userid = user.id
		courseId = request.GET.get('courseId')
		ma = MasterAssignment.objects.filter(cId = courseId)
		output = []
		
		for c in ma:
			obj = {}
			obj["Assignment Name"] = c.assingnmentTitle
			obj["Due Date"] = c.dueDate.strftime("%m/%d/%y %H:%M")
			try:
				sa =StudentAssignment.objects.filter(aId__assingnmentNumber = c.assingnmentNumber, cId = c.cId, userId=userid)
				if len(sa) > 0:
					obj["Status"]=sa[0].isSubmitted
					obj["Score"]=sa[0].receivedPoints
				else:
					obj["Status"]=False
					obj["Score"]=0
				obj['comments'] = sa[0].commentsJson
			except:
				obj["Status"]=False
				obj["Score"]=0
			obj["Max points"] = c.maxPoints
			output.append(obj)
		
		return JsonResponse({"Response":output})
	else:
		return JsonResponse({"Method not supported"})

def getAllUsersMethod(request):
	if request.method == "GET":

		response = getAllUsersAPI()
		return JsonResponse({
                    "Error": "NA",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})
	

def getAllStudentsMethod(request):
	if request.method == "GET":

		response = getAllStudentsAPI()
		return JsonResponse({
                    "Error": "NA",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})
	

def getAllProfessorsMethod(request):
	if request.method == "GET":

		response = getAllProfessorsAPI()
		return JsonResponse({
                    "Error": "NA",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})


def getAllSemestersMethod(request):
	if request.method == "GET":

		response = getAllSemestersAPI()
		return JsonResponse({
                    "Error": "NA",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})


def getAllDegreesMethod(request):
	if request.method == "GET":

		response = getAllDegreesAPI()
		return JsonResponse({
                    "Error": "NA",
                    "response": response,
                    }, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})



@csrf_exempt
def chatUpdateApiMethod(request):
	if request.method == "POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		senderusername = body['senderusername']
		username1 = body['username1']
		username2 = body['username2']
		message = body['message']	
		messageSender = "u2"

		if username1 == username2:
			return JsonResponse({"Error": "Yes", "Message": "User cannot send message to self"})

		if senderusername == username1:
			messageSender = "u1"

		u1 = User.objects.get(username = username1)
		u2 = User.objects.get(username = username2)
		senderuser = User.objects.get(username = senderusername)
		thredId, us1, us2 = Utilities().getChatThreadId(u1,u2)

		if thredId == "-1":
			chat = ChatModel()
			chat.userId1 = u1
			chat.userId2 = u2
			chat.message = message
			chat.threadId = chat.id
			chat.senderId = messageSender   # ignore this field
			chat.messageSenderId = str(senderuser.id)
			chat.messageDateTime = dts.now()
			chat.save()
			chat.threadId = str(chat.id)
			chat.save()
			thredId = str(chat.id)
		else:
			chat = ChatModel()
			chat.userId1 = us1
			chat.userId2 = us2
			chat.message = message
			chat.threadId = thredId
			chat.senderId = messageSender		 # ignore this field
			chat.messageSenderId = str(senderuser.id)
			chat.messageDateTime = dts.now()
			chat.save()

		return JsonResponse({"Status": "Success", "ThredId" : thredId, "username1" : username1, "username2" : username2, "MessageDateTime" :  dts.now()})
	
	else:
		return JsonResponse({"Error": "Method not supported"})

@csrf_exempt
def uploadProfessorAssignmentMethod(request):
	if request.method == "POST" and request.FILES.get('file'):
		container_name="professorassignmentfiles"
		storage_account_name = "edusphere"
		storage_account_key = "FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw=="
		connection_string="DefaultEndpointsProtocol=https;AccountName=edusphere;AccountKey=FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw==;EndpointSuffix=core.windows.net"
		userid = request.POST.get('userid')
		courseid = request.POST.get('courseid')
		title = request.POST.get('title')
		description = request.POST.get('description')
		assignmentid = request.POST.get('assignmentid')
		points = request.POST.get('points')
		duedate=request.POST.get('duedate')
		# date_obj=parse(duedate).strftime('%Y-%m-%d')
		date_obj = parse(duedate).strftime('%Y-%m-%d %H:%M:%S%z')
		# date_obj=parse(duedate) #.strftime('%Y-%m-%d %H:%M')
		file=request.FILES['file']
		# print('file')
		# file_name=file.name
		file_name = f'{uuid.uuid4()}-{file.name}'
		
		if not file.name.endswith(('.pdf', '.doc', '.docx', '.txt')):
			return HttpResponseBadRequest('Only PDF, DOC and TXT files are allowed.')

		else:
			blob_service_client = BlobServiceClient.from_connection_string(connection_string)
			container_client = blob_service_client.get_container_client(container_name)
			blob_client = container_client.get_blob_client(file_name)
			blob_client.upload_blob(file)

			#getting the url of the file that was uploaded
			file_url = get_file_url_professor(file_name)


			#Get the CoursesOfferedByCycle instance corresponding to the courseid value
			try:
				course=CoursesOfferedByCycle.objects.get(id=courseid)
			except CoursesOfferedByCycle.DoesNotExist:
				return HttpResponseBadRequest('Invalid course ID')
			
			with connection.cursor() as cursor:
				cursor.execute("SELECT setval('edusphere_masterassignment_id_seq', (SELECT MAX(id) FROM edusphere_masterassignment));")
			
			total = MasterAssignment.objects.filter(cId=course)
			assingnmentNumber = len(total) + 1


			# Create a new MasterAssignment object and save it to the database
			master_assignment=MasterAssignment(
				assingnmentNumber=assingnmentNumber,
                assingnmentTitle=title,
                maxPoints=points,
                dueDate=date_obj,
                description=description,
                cId=course,
                assignmentLink=file_url
			)
			master_assignment.save()

			return JsonResponse({'Status':'Success',
									"Message": "Assignment created successfully",
									"courseid" : str(courseid),
									"aid" : str(master_assignment.id)
									})
		# return JsonResponse({"Success": "file uploaded"})
	else:
		return JsonResponse({"Error": "Method not supported"})
	

@csrf_exempt
def uploadStudentAssignmentMethod(request):
	if request.method == "POST" and request.FILES.get('file'):
		container_name="studentassignmentfiles"
		storage_account_name = "edusphere"
		storage_account_key = "FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw=="
		connection_string="DefaultEndpointsProtocol=https;AccountName=edusphere;AccountKey=FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw==;EndpointSuffix=core.windows.net"
		username = request.POST.get('username')
		courseid = request.POST.get('courseid')
		assignmentid = request.POST.get('assignmentid')
		file=request.FILES['file']
		# file_name=file.name
		file_name = f'{uuid.uuid4()}-{file.name}'

		User = get_user_model()
		user = User.objects.get(username=username)

	
		if not file.name.endswith(('.pdf', '.doc', '.docx', '.txt')):
			return HttpResponseBadRequest('Only PDF, DOC and TXT files are allowed.')
		
		else:
			blob_service_client = BlobServiceClient.from_connection_string(connection_string)
			container_client = blob_service_client.get_container_client(container_name)
			blob_client = container_client.get_blob_client(file_name)
			blob_client.upload_blob(file)

			#getting the url of the file that was uploaded
			file_url = get_file_url_student(file_name)
			#print(file_url)
			
			with connection.cursor() as cursor:
				cursor.execute("SELECT setval('edusphere_studentassignment_id_seq', (SELECT MAX(id) FROM edusphere_studentassignment));")
			
			course = CoursesOfferedByCycle.objects.get(id=courseid)

			# Get the MasterAssignment instance corresponding to the assignmentid value
			master_assignment = MasterAssignment.objects.get(assingnmentNumber=assignmentid,cId=courseid)

			master_assignment_maxpoints = master_assignment.maxPoints

			try:
				student_assignment = StudentAssignment.objects.get(userId=user, cId=course, aId=master_assignment)
				student_assignment.submissionAssignmentLink = file_url
				student_assignment.isSubmitted = True
				student_assignment.isSubmittedDate = dts.now()
				student_assignment.maxPoints = master_assignment_maxpoints
				student_assignment.receivedPoints = None
				student_assignment.save()
				return JsonResponse({"Success": "File uploaded"})
				
			except StudentAssignment.DoesNotExist:
				# Create a new student assignment object and save it to the database			
				student_assignment=StudentAssignment(
					userId=user,
					cId=course,
					aId=master_assignment,
					submissionAssignmentLink=file_url,
					isSubmitted=True,
					isSubmittedDate=dts.now(),
					maxPoints=master_assignment_maxpoints,
					receivedPoints=None
				)
				
				student_assignment.save()
				return JsonResponse({"Success": "File uploaded"})
	else:
		return JsonResponse({"Error": "Method not supported"})

#get the url of the assignment files uploaded on professor container azure blob
def get_file_url_professor(file_name):
    # Set up the connection to the Azure Blob storage
    connection_string="DefaultEndpointsProtocol=https;AccountName=edusphere;AccountKey=FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw==;EndpointSuffix=core.windows.net"
    container_name="professorassignmentfiles"
    storage_account_name = "edusphere"
    storage_account_key = "FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw=="
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)
    # Create a BlobClient object to represent the file
    blob_client = container_client.get_blob_client(file_name)
    # Get the URL to the file
    url = blob_client.url
    # Return the URL as a string
    return str(url)

#get the url of the assignment files uploaded on student container azure blob
def get_file_url_student(file_name):
    # Set up the connection to the Azure Blob storage
    connection_string="DefaultEndpointsProtocol=https;AccountName=edusphere;AccountKey=FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw==;EndpointSuffix=core.windows.net"
    container_name="studentassignmentfiles"
    storage_account_name = "edusphere"
    storage_account_key = "FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw=="
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)
    # Create a BlobClient object to represent the file
    blob_client = container_client.get_blob_client(file_name)
    # Get the URL to the file
    url = blob_client.url
    # Return the URL as a string
    return str(url)

#listing gradebook for a professor
@csrf_exempt
def getGradeListMethod(request):
	if request.method == "GET":
		assignmentId = request.GET.get('assignmentId')
		courseId = request.GET.get('courseId')
		studentassignment = StudentAssignment.objects.filter(aId__assingnmentNumber=assignmentId, cId=courseId)
		if not studentassignment.exists():
			return JsonResponse({"Error": "Record doesn't exist"})
        
		response = []
    
		for sa in studentassignment:
			obj = {}
			obj["userId"] = sa.userId_id
			obj["studentfirstname"] = sa.userId.first_name
			obj["studentlastname"] = sa.userId.last_name
			obj["isSubmitted"] = sa.isSubmitted
			obj["isSubmittedDate"] = sa.isSubmittedDate
			obj["receivedPoints"] = sa.receivedPoints
			obj["maxPoints"] = sa.maxPoints
			obj["comments"] = sa.commentsJson
			obj["assignmentlink"] = sa.submissionAssignmentLink
			response.append(obj)

		return JsonResponse(response, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})
    

# def read_azure_file(request):
#     blob_service_client = BlobServiceClient.from_connection_string('DefaultEndpointsProtocol=https;AccountName=edusphere;AccountKey=FGvgM6ioPdxTiI+fHHJf3R+JQ5xMe924XkS5MVXLtApsE6qFBbmZm6dZrPN5Gj+/ILNLjaQFRH5V+AStmbx6iw==;EndpointSuffix=core.windows.net')
#     container_client = blob_service_client.get_container_client('professorassignmentfiles')
#     blob_client = container_client.get_blob_client('<your blob name>')
#     stream = blob_client.download_blob().readall()
#     pdf_reader = PdfFileReader(BytesIO(stream))
#     content = []
#     for page_num in range(pdf_reader.numPages):
#         page = pdf_reader.getPage(page_num)
#         content.append(page.extractText())
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = 'inline; filename="<your filename>.pdf"'
#     response.write(''.join(content).encode())
#     return response
		
	

@csrf_exempt
def chatGetChatThreadsMethod(request):
	if request.method == "GET":
		# body_unicode = request.body.decode('utf-8')
		# body = json.loads(body_unicode)
		# userId = body['userName']
		username = request.GET["username"]
		user = User.objects.get(username = username)

		threads = Utilities().getThreadIdForUser(user.id)
		usersInvolved = Utilities().getChatUsersInvolved(user.id, threads)

		return JsonResponse({"Status": "Success", "ThredId" : threads, "data" : usersInvolved})

	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


@csrf_exempt
def getRespectiveChatThreadsMethod(request):
	if request.method == "GET":
		username = request.GET["username"]
		user = User.objects.get(username = username)

		threads = Utilities().getThreadIdForUser(user.id)
		# usersInvolved = Utilities().getChatUsersInvolved(user.id, threads)
		data, connectedUsers = Utilities().getChatData(user.id, threads)	
		data = Utilities().getAllOtherUsers(user.id, data, connectedUsers)	

		return JsonResponse({"Status": "Success", "ThreadId" : threads, "data" : data})

	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})

	
		
@csrf_exempt
@api_view(['GET'])
def annCourse(request,id):
	if request.method=="GET":
			retjson=[]
			# print(request.user.email)
			p_data=list(Announcements.objects.filter(cId_id__id=id))
			for val in p_data:
				serializer=AnnouncementSerializer(val)
				retjson.append(serializer.data)
			return JsonResponse({"Announcements":retjson})

	
@csrf_exempt
def getAdminCoursesApproved(request):
	if request.method == "GET":
		# body_unicode = request.body.decode('utf-8')
		# body = json.loads(body_unicode)
		# userId = body['userId']
		coursesToBeApproved = CoursesOfferedByCycle.objects.filter(adminApprovedCourse = False)

		data = []
		for c in coursesToBeApproved:
			p = UserPersonalDetails.objects.get(userId = c.professorId)
			obj = {}
			obj["courseName"] = c.courseName
			obj["courseId"] = c.id
			obj["masterCourseId"] = c.courseId.id
			obj["professorName"] = "Prof. " + str(p.firstName) +" "+ str(p.lastName)
			obj["courseDescription"] = c.courseDescription
			obj["adminApprovedCourse"] = c.adminApprovedCourse
			obj["adminAppprovedDateTime"] = c.adminAppprovedDateTime

			data.append(obj)

		return JsonResponse({"Status": "Success", "response" : data})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})


@csrf_exempt
def saveAdminApproveCourse(request):
	if request.method == "POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		userId = body['userId']
		courseId = body['courseId']
		decision = body.get('decision',"approve")

		coursesToBeApproved = CoursesOfferedByCycle.objects.filter(id = courseId)
		response = []
		for c in coursesToBeApproved:
			if decision == "approve":
				msg = "Admin "+ str(userId) + " has approved course "+str(c.id) + " @" +str(dts.now())
				c.adminApprovedCourse = True
				c.adminAppprovedDateTime = dts.now()
				c.tempChar = str(msg)
			else:
				msg = "Admin "+ str(userId) + " has rejected course "+str(c.id) + " @" +str(dts.now())
				c.adminApprovedCourse = False
				c.adminRejectedDateTime = dts.now()
				c.tempChar = str(msg)
				
			c.save()
			
			obj = {}
			obj["courseId"] = c.id
			obj["msg"] = msg
			response.append(obj)
	
		return JsonResponse({"Status": "Success", "response" : response})
	else:
		return JsonResponse({'Status':'Failed',"response": "Method not supported"})


@csrf_exempt
def createOrUpdateCourseModule(request):
	if request.method == "POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		userId = body['userId']
		courseId = body['courseId']
		moduleTitle = body['moduleTitle']
		moduleDescription = body['moduleDescription']
		moduleLink = body['moduleLink']

		c = CoursesOfferedByCycle.objects.get(id = courseId)
		module = list(c.courseModulesJson) if c.courseModulesJson else []
		moduleJson = {}
		moduleJson["moduleTitle"] = str(moduleTitle)
		moduleJson["moduleDescription"] = str(moduleDescription)
		moduleJson["moduleLink"] = str(moduleLink)
		moduleJson["date"] = dts.now().strftime("%m/%d/%y %H:%M")

		module.append(moduleJson)
		c.courseModulesJson = module
		c.save()

		return JsonResponse({"Status": "Success", "Response" : c.courseModulesJson})
	else:
		return JsonResponse({'Status':'Failed',"Message": "Method not supported"})
	
@csrf_exempt
def getmodulesMethod(request):
    if request.method == "GET":
        courseid = request.GET.get('courseid')
    
        modules = CoursesOfferedByCycle.objects.filter(id=courseid)
        course_modules = [module.courseModulesJson for module in modules]
        
        response = {
            "modules": course_modules
        }
        return JsonResponse({'Status': 'Success', "Response": response})
    else:
        return JsonResponse({'Status': 'Failed', "Message": "Method not supported"})

def getAssignmentByUserID(request):
	if request.method=="GET":
		username = request.GET.get('username') or request.user.id
		# body_unicode = request.body.decode('utf-8')
		# body = json.loads(body_unicode)
		# username = body['username']
		user_val=UserPersonalDetails.objects.get(userId__username=username)
		type=user_val.userType
		retjson=[]
		# print(request.user.id)
		if type=="s" or type=="S":
			val=StudentAssignment.objects.filter(userId__username=username)
			for v in val:
				corDetails=MasterCourses.objects.get(id=v.cId.courseId.id)
				assDetailsMany=MasterAssignment.objects.filter(cId__id=v.cId.id).order_by("-id")
				cor_off=CoursesOfferedByCycle.objects.get(id=v.cId.id)
				prof=UserPersonalDetails.objects.get(userId_id=cor_off.professorId)
				for assDetails in assDetailsMany:
					obj={}
					obj["Assignment Title"]=assDetails.assingnmentTitle
					obj["DueDate"]=assDetails.dueDate.strftime("%m/%d/%y")
					obj["CourseName"]=corDetails.cName
					obj["ProfessorName"]=prof.firstName
					retjson.append(obj)
		elif type=="i" or type=="I":
			print("Prof")
			retjson = []
			cids=CoursesOfferedByCycle.objects.filter(professorId__username=username).values_list("id",flat=True)
			for c in cids:
				ma=MasterAssignment.objects.filter(cId__id=c)
				for m in ma:
					prof=UserPersonalDetails.objects.get(userId__username=username)

					obj={}
					obj["Assignment Title"] = m.assingnmentTitle
					obj["DueDate"] = m.dueDate.strftime("%d-%m-%Y")
					obj["ProfessorName"]=prof.firstName

					cId=m.cId_id
					if cId:
						val= CoursesOfferedByCycle.objects.get(id=cId)
						obj["CourseName"]=val.courseName

					retjson.append(obj)
			
	return JsonResponse({"response":retjson})


def getAssignmentByCourse(request,id):
	if request.method=="GET":
		# body_unicode = request.body.decode('utf-8')
		# body = json.loads(body_unicode)
		# username = body['username']
		# user_val=UserPersonalDetails.objects.get(userId__username=username)
		# user_id=user_val.userId_id
		retjson=[]
		print(request.user.id)
		val=StudentAssignment.objects.filter(userId_id__id=request.user.id)
		for v in val:
			corDetails=MasterCourses.objects.get(id=id)
			assDetailsMany=MasterAssignment.objects.filter(cId_id=id)
			cor_off=CoursesOfferedByCycle.objects.get(courseId_id=id)
			prof=UserPersonalDetails.objects.get(userId_id=cor_off.professorId)
			for assDetails in assDetailsMany:
				obj={}
				obj["Assignment Title"]=assDetails.assingnmentTitle
				obj["DueDate"]=assDetails.dueDate
				obj["CourseName"]=corDetails.cName
				obj["ProfessorName"]=prof.firstName
				retjson.append(obj)
	return JsonResponse({"Assignment":retjson})


# @csrf_exempt
# def getNotificationsForCalenderView(request):
# 	if request.method == 'GET':
# 		username = request.GET.get('username') or request.user.id
# 		dateParam = request.GET.get('date') 
		
# 		nextMonthDate = 
# 		user_val = UserPersonalDetails.objects.get(userId__username=username)
# 		s_data = StudentEnrollment.objects.filter(userId_id__id=user_id).values_list("cId__id")

# 		ann = Announcements.objects.filter(cId_id__in = s_data).group_by("date")
# 		assignments = 
# 		assDetailsMany=MasterAssignment.objects.filter(cId_id=v.cId_id).order_by("-id")
# 		cor_off=CoursesOfferedByCycle.objects.get(courseId_id=v.cId_id)

			# retjson=[]
			# print(request.user.email)
			# body_unicode = request.body.decode('utf-8')
			# body = json.loads(body_unicode)
			# username = body['username']
			# user_val=UserPersonalDetails.objects.get(userId__username=username)
			# user_id=user_val.userId_id
			# p_data=StudentEnrollment.objects.filter(userId_id__id=user_id)
			# for val in p_data:
			# 	anns=Announcements.objects.filter(cId_id=val.cId).order_by("-id")
			# 	course=CoursesOfferedByCycle.objects.get(id=val.cId.id)
			# 	for a in anns:

			# 		obj={}
			# 		obj["Title"]=a.title
			# 		obj["Description"]=a.description
			# 		obj["Date"]=a.dateCreated.strftime("%m/%d/%y")
			# 		obj["Course"]=course.courseName
			# 		retjson.append(obj)
		
	# else:
	# 	return JsonResponse({'Status':'Failed',"Message": "Method not supported"})




#Assignment ka due date of that user id, announcement ka create date


def calendarView(request):
	if request.method == "GET":

		username = request.GET['username']
		user_val=UserPersonalDetails.objects.get(userId__username=username)
		user_id=user_val.userId_id
		date = request.GET['date']
		year = int(date[:4])
		month= int(date[5:7])
		day1= int(date[8:])
		# return JsonResponse({"Date":day})
		type = Utilities().getTypeOfUser(user_id)
		print(user_id,id)
		print(type)
		if type =="s" or type =="S":
			print("Stud")
			cids = StudentEnrollment.objects.filter(userId__id = user_id).values_list("cId__id",flat=True)
			output_ass = []
			output_ann = []
			for c in cids:
				ma = MasterAssignment.objects.filter(cId__id = c)
				for a in ma:
					obj = {}
					day =(a.dueDate)
					# print(type(day.day))
					if int(day.year) - year ==0:
						if int(day.month) - month ==0:
							if int(day.day) - day1 ==0:
								print(a.assingnmentTitle)
					
								obj["assignmentTitle"] = a.assingnmentTitle
								obj["dueDate"] = a.dueDate.strftime("%d-%m-%Y")
								cId=a.cId_id
								if cId:
									val= CoursesOfferedByCycle.objects.get(id=cId)
									obj["courseName"]=val.courseName
								output_ass.append(obj)

			for c in cids:
				ann=Announcements.objects.filter(cId__id=c)
				for a in ann:
					obj={}
					day=a.dateCreated
					if int(day.year) - year ==0:
						if int(day.month) - month ==0:
							if int(day.day) - day1 ==0:
								print(a.title)
					
								obj["announcementTitle"] = a.title
								obj["dateCreated"] = a.dateCreated.strftime("%d-%m-%Y")
								cId=a.cId_id
								if cId:
									val= CoursesOfferedByCycle.objects.get(id=cId)
									obj["courseName"]=val.courseName
								output_ann.append(obj)
			return JsonResponse({"Assignments":output_ass,"Announcements":output_ann})
		elif type=="i" or type=="I":
			print("Prof")
			output_ass = []
			output_ann = []
			cids=CoursesOfferedByCycle.objects.filter(professorId_id__id=user_id).values_list("id",flat=True)
			for c in cids:
				ann=Announcements.objects.filter(cId__id=c)
				for a in ann:
					obj={}
					day=a.dateCreated
					if int(day.year) - year ==0:
						if int(day.month) - month ==0:
							if int(day.day) - day1 ==0:
								print(a.title)
								obj["announcementTitle"] = a.title
								obj["dateCreated"] = a.dateCreated.strftime("%d-%m-%Y")
								cId=a.cId_id
								if cId:
									val= CoursesOfferedByCycle.objects.get(id=cId)
									obj["courseName"]=val.courseName
								output_ann.append(obj)
			for c in cids:
				ma=MasterAssignment.objects.filter(cId__id=c)
				for m in ma:
					obj={}
					day=m.dateCreated
					if int(day.year) - year ==0:
						if int(day.month) - month ==0:
							if int(day.day) - day1 ==0:
								print(m.assingnmentTitle)
								obj["assignmentTitle"] = m.assingnmentTitle
								obj["dueDate"] = m.dueDate.strftime("%d-%m-%Y")
								cId=m.cId_id
								if cId:
									val= CoursesOfferedByCycle.objects.get(id=cId)
									obj["courseName"]=val.courseName
								output_ass.append(obj)
			return JsonResponse({"Assignments":output_ass,"Announcements":output_ann})
		
@csrf_exempt
def getProfessorCreatedAssignment(request):
	if request.method == "GET":
		username = request.GET["username"]
		courseId = request.GET["courseId"]
		response = getProfessorCreatedAssignmentAPI(username, courseId)
		return JsonResponse({
					"Error": "NA",
					"response": response,
					}, safe=False)
	else:
		return JsonResponse({"Error": "Method not supported"})


@csrf_exempt
def contactmail(request):
	if request.method=="POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		name = body['name']
		sub = body['subject']
		email = body['email']
		phone = body['phone']
		message = body['message']		

		# val = UserPersonalDetails.objects.get(email_address=email)
		if email:
				ticketNumber = random.randint(1,200)
				subject = 'Contacting Edusphere regarding '+ str(sub)
				email_from = settings.EMAIL_HOST_USER
				displayMessage = f"Your ticket number is {ticketNumber}.\nOur team will get back to you as soon as possible"
				content = f"Hello {name},\n\nThank you for contacting us.\nYour ticket number is {ticketNumber}.\nOur team will get back to you as soon as possible.\n-Team Edusphere"
				recipient_list = [email]
				send_mail( subject, content, email_from, recipient_list )
				if email:
					subject = 'Contact '+ str(name)
					email_from = settings.EMAIL_HOST_USER
					content = "\nUser : {name} \nSubject : {sub} \nMessaged : {message} \nFollowing are the contact details \nPhone : {phone} \nEmail : {email}".format(name=name,email=email,sub=sub,message=message,phone=phone)
					recipient_list = [email_from]
					send_mail( subject, content, email_from, recipient_list )
				return JsonResponse({'Status':'Success', 'Message' : 'The details are sent to your email',"displayMessage" : displayMessage})
		else:
			return JsonResponse({'Status':'Failed', 'Message' : 'Please check the contact form and submit again'})

