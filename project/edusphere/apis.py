from this import d
from edusphere.models import *
import datetime

def getMyCoursesAPI(userId, type):

    requestedCourses = []
    if type == "S":
        enrollments = StudentEnrollment.objects.filter(userId__id=userId)
        for i in enrollments:
            cobj = i.cId
            p = Professors.object.get(userId = cobj.professorId)
            obj = {}
            obj["courseName"] = cobj.courseName
            obj["courseDescription"] = cobj.courseDescription
            obj["courseLevel"] = cobj.courseLevel
            obj["professorName"] = "Dr. "+ str(p.first_name) +" " + str(p.last_name)
            requestedCourses.append(obj)

    elif type == "I":
        courses = CoursesOfferedByCycle.objects.filter(professorId__id=userId)
        for i in courses:
            p = Professors.object.get(userId = i.professorId)
            obj = {}
            obj["courseName"] = i.courseName
            obj["courseDescription"] = i.courseDescription
            obj["courseLevel"] = i.courseLevel
            obj["professorName"] = "Dr. "+ str(p.first_name) +" " + str(p.last_name)
            requestedCourses.append(obj)

    return requestedCourses


def getAllInstitutesAPI():
    courses = MasterInstitutes.objects.filter(isInActive = False)
    response = []
    for c in courses:
        obj = {}
        obj["name"] = c.instituteName
        obj["shortName"] = c.instituteShortHandName
        obj["directors"] = c.directors
        obj["city"] = c.city
        obj["state"] = c.state
        obj["totalStudentCapacity"] = c.totalStudentCapacity
        obj["rank"] = c.rank
        response.append(obj)
    
    return response


def getAllCoursesAPI():
    courses = MasterCourses.objects.filter(isInActive = False)
    response = []
    for c in courses:
        obj = {}
        obj["name"] = c.cName
        obj["id"] = c.id
        obj["shortName"] = c.cShortName
        obj["description"] = c.cDescription
        obj["syllabus"] = c.cSyllabusJson
        obj["modules"] = c.cModulesJson
        obj["skillJson"] = c.skillJson
        obj["cLevel"] = c.cLevel
        response.append(obj)
    
    return response

def getAllCourseProfessorAPI(username):
    courses = MasterCourses.objects.filter(isInActive = False)
    response = []
    for c in courses:
        obj = {}
        obj["name"] = c.cName
        obj["id"] = c.id
        obj["shortName"] = c.cShortName
        obj["description"] = c.cDescription
        obj["syllabus"] = c.cSyllabusJson
        obj["modules"] = c.cModulesJson
        obj["skillJson"] = c.skillJson
        obj["cLevel"] = c.cLevel

        courseOfferedCycle = CoursesOfferedByCycle.objects.filter(courseId = c.id, professorId__username = username)
        if len(courseOfferedCycle) > 0:
            obj["courseExists"] = True
        else:
            obj["courseExists"] = False
        
        response.append(obj)
    
    return response


def getAllCurrentSemesterAvailbleCoursesMethodAPI():
    courses = CoursesOfferedByCycle.objects.filter(isInActive = False, adminApprovedCourse = True)
    response = []
    for c in courses:
        obj = {}
        p = UserPersonalDetails.objects.get(userId = c.professorId)
        obj["name"] = c.courseName
        obj["id"] = c.id
        obj["professorId"] = p.userId.id
        obj["professorName"] = "Prof. "+ str(p.firstName) +" "+ str(p.lastName)
        obj["masterCourseId"] = c.courseId.id
        obj["shortName"] = c.courseShortName
        obj["description"] = c.courseDescription
        obj["syllabus"] = c.courseSyllabusJson
        obj["modules"] = c.courseModulesJson
        obj["skillJson"] = c.skillJson
        obj["cLevel"] = c.courseLevel
        obj["startDate"] = c.startDate
        obj["endDate"] = c.endDate
        obj["adminApprovedCourse"] = c.adminApprovedCourse
        obj["adminAppprovedDateTime"] = c.adminAppprovedDateTime

        response.append(obj)
    
    return response


def getAllUsersAPI():
    users = UserPersonalDetails.objects.filter(isInActive = False)
    response = []
    for u in users:
        obj = {}
        obj["userId"] = u.userId.id
        obj["firstName"] = u.firstName
        obj["lastName"] = u.lastName
        obj["username"] = u.userId.username
        obj["userType"] = u.userType

        response.append(obj)
    
    return response


    iId = models.ForeignKey(MasterInstitutes,on_delete=models.CASCADE,null=False,blank=False)
    dId = models.ForeignKey(MasterDegrees,on_delete=models.CASCADE,null=False,blank=False)
    sId = models.ForeignKey(MasterSemesterYear,on_delete=models.CASCADE,null=False,blank=False)
    onboardingDate = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    isGraduated = models.BooleanField(default=False)

def getAllStudentsAPI():
    users = UserPersonalDetails.objects.filter(isInActive = False, userType= "S")
    response = []
    for u in users:
        try:
            s = Students.objects.get(userId = u.userId)
            i = MasterInstitutes.objects.get(id = s.iId.id)
            d = MasterDegrees.objects.get(id = s.iId.id)
            sy = MasterSemesterYear.objects.get(id = s.iId.id)
            obj = {}
            obj["userId"] = u.userId.id
            obj["firstName"] = u.firstName
            obj["lastName"] = u.lastName
            obj["username"] = u.userId.username
            obj["userType"] = u.userType
            obj["instituteId"] = i.id
            obj["instituteName"] = i.instituteName
            obj["degree"] = d.nameofDegree
            obj["semesterYear"] = str(sy.cycle) + str(sy.year)
            obj["degree"] = d.nameofDegree
            obj["biography"] = s.biography
            obj["isGraduated"] = s.isGraduated
            obj["onboardingDate"] = s.onboardingDate.date()

            response.append(obj)
        except Exception as e:
            print("Exception , ",e)
            pass
    return response

def getAllProfessorsAPI():
    users = UserPersonalDetails.objects.filter(isInActive = False, userType__in= ["I","i"])
    response = []
    for u in users:
        try:
            p = Professors.objects.get(userId = u.userId)
            i = MasterInstitutes.objects.get(id = p.iId.id)
            obj = {}
            obj["userId"] = u.userId.id
            obj["firstName"] = u.firstName
            obj["lastName"] = u.lastName
            obj["username"] = u.userId.username
            obj["userType"] = u.userType
            obj["typeOfProfessor"] = p.typeOfProfessor
            obj["instituteId"] = i.id
            obj["instituteName"] = i.instituteName
            obj["biography"] = p.biography
            obj["domainInterests"] = p.domainInterests
            obj["portfolioLink"] = p.portfolioLink
            obj["yearsOfworkEx"] = p.yearsOfworkEx
        except Exception as ex:
            pass
        response.append(obj)
    
    return response


def getAllSemestersAPI():
    semesterYears = MasterSemesterYear.objects.filter(isInActive = False)
    response = []
    for s in semesterYears:
        try:
            obj = {}
            obj["id"] = s.id
            obj["cycle"] = s.get_cycle_display()
            obj["year"] = s.year
            obj["semester"] = str(s.get_cycle_display()) +" "+ str(s.year)

        except:
            pass
        response.append(obj)
    
    return response


def getAllDegreesAPI():
    alldegrees = MasterDegrees.objects.filter(isInActive = False)
    response = []
    for a in alldegrees:
        try:
            obj = {}
            obj["id"] = a.id
            obj["nameofDegree"] = a.nameofDegree
            obj["shortName"] = a.shortName
            obj["lengthOfDegree"] = a.lengthOfDegree

        except:
            pass
        response.append(obj)
    
    return response
#get the course details whose id is sent through request
def getCourseAPI(course_Id):
    if CoursesOfferedByCycle.objects.filter(courseId=course_Id,isInActive=True).exists():
        courses = CoursesOfferedByCycle.objects.get(courseId=course_Id,isInActive=True)
        #print(courses)
        response = {}
        response["name"] = courses.courseName
        response["shortName"] = courses.courseShortName
        response["description"] = courses.courseDescription
        response["syllabus"] = courses.courseSyllabusJson
        response["modules"] = courses.courseModulesJson
        response["skillJson"] = courses.skillJson
        response["cLevel"] = courses.courseLevel
    else:
        response={} 
        response["Error message"] = "Course ID does not exist";

    return response

#instructor assigns grades to an assignment through this API
def gradeAssignmentAPI(userid,assignmentId,courseId,points,comments):
    response={}
    if StudentAssignment.objects.filter(userId=userid,aId=assignmentId,cId=courseId,isSubmitted=True).exists():
        assignment = StudentAssignment.objects.get(userId=userid,aId=assignmentId,cId=courseId,isSubmitted=True)
        print("Hi")
        print(assignment)
        # print(assignment.receivedPoints)
        # print(assignment.gradeReceivedDate)
        # print(assignment.isSubmitted)
        print(type(assignment.commentsJson))
        if (points<=assignment.maxPoints):
            assignment.receivedPoints=points #updated the received points field
            print(assignment.receivedPoints)
            assignment.gradeReceivedDate=datetime.date.today(); #updated graded date to the current time 
            assignment.commentsJson=comments
            response["Message"] = "Successfuly assigned points";
        else:
            response["Error message"] = "Assigned points is greater than max points for the assignment";
    else:
        response["Error message"] = "Error in grading assignment";

    return assignment


def getProfessorCreatedAssignmentAPI(username, courseId):
    output = []
    ma = MasterAssignment.objects.filter(cId__id = courseId).order_by("id")
    for a in ma:
        obj = {}
        obj["assingnmentNumber"] = a.assingnmentNumber
        obj["assingnmentTitle"] = a.assingnmentTitle
        obj["maxPoints"] = a.maxPoints
        obj["courseId"] = courseId
        obj["dateCreated"] = a.dateCreated.strftime("%m/%d/%y")
        obj["description"] = a.description
        obj["assignmentLink"] = a.assignmentLink
        obj["dueDate"] = a.dueDate.strftime("%m/%d/%y %H:%M")

        output.append(obj)
    
    return output

