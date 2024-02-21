# lms/urls.py
from django.urls import include, path

# from . import views
from edusphere.views import * 

urlpatterns = [
    # re_path(r'', views.hello()),
    # re_path('', hi.test, name='test'),
    # path('test/', test),
    path('testjson/', testjson),
    path('signup/', SignupUser),
    path('login/', LoginUser),
    path('logout/', Logout),
    path('api/profile/', userProfile),
    path('api/all_announcements/',getAllAnnouncements),   
    path('api/announcements/<int:id>',eachAnnouncement),
    path('api/recover/',RecoverAccount),
    path('api/recover_confirm/',ResetPasswordConfirm),
    path('api/due_date/',getUserDue),
    path('api/getUserAssignment/',getAssignmentByUserID),
    path('api/getCourseAssignment/<int:id>',getAssignmentByCourse),
    path('api/createAnnouncement/<int:id>',createAnn),
    path('api/getAnnouncementByCourse/<int:id>',getAnnouncementByCourse),
    path('api/calendarView/',calendarView),
    path('api/contact/',contactmail),


 

    path('api/my-courses/', getMyCoursesMethod),
    path('api/my-courses-professor/', getMyCoursesProfessorMethod),

    # path('api/temp_search/',searchCourse),
    path('api/all-courses', getAllCoursesMethod),
    path('api/all-institutes', getAllInstitutesMethod),
    path('api/all-users', getAllUsersMethod),
    path('api/all-students', getAllStudentsMethod),
    path('api/all-professors', getAllProfessorsMethod),
    path('api/all-semesters', getAllSemestersMethod),
    path('api/all-degrees', getAllDegreesMethod),

    path('api/all-courses-available-current-semester', getAllCurrentSemesterAvailbleCoursesMethod),

    
    path('api/enroll-course', studentEnrollCourse),

    path('api/create-update-course', createOrUpdateNewCourse),
    path('api/chat-api/', chatUpdateApiMethod),
    path('api/chat-update/', chatUpdateApiMethod),
    path('api/chat-get-threads/', chatGetChatThreadsMethod),            
    path('api/chats-for-user/', getRespectiveChatThreadsMethod),
    path('api/admin-course-view', getAdminCoursesApproved),
    path('api/admin-approve-course', saveAdminApproveCourse),

    path('api/create-update-course-module', createOrUpdateCourseModule),
    # path('api/get-notifications-calender-view', getNotificationsForCalenderView),    


    path('api/my_courses', getMyCoursesMethod),
    path('api/all_courses', getAllCoursesMethod),
    # path('api/all_institutes', getAllInstitutesMethod),
    path('api/course_info/<int:id>', getCoursemethod),
    path('api/instuctor_grade_assignment', gradeAssignmentMethod),
    path('api/student_check_grade', studentlistgradeMethod),
    path('api/student_upload_assignment', uploadStudentAssignmentMethod),
    path('api/professor_upload_assignment', uploadProfessorAssignmentMethod),
    path('api/professor_list_gradebookview', getGradeListMethod),
    path('api/view_modules', getmodulesMethod),
    path('api/get_professor_created_assignment', getProfessorCreatedAssignment),

    path('', homeview, name='React'),



]