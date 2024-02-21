import React from 'react'
// import user1 from '../../images/patrick.png'
// import user2 from '../../images/nan.jpg'
import './Testimonials.css'

const MainContent = () => {
    return (
        <React.Fragment>
            <section className="content-container">
            <div style={{ 
                fontFamily: 'Arial, sans-serif' 
                }}>
                <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                }}>
                        Elevate your learning experience
                </h2>
                <p style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.5', 
                    marginBottom: '30px' 
                }}>
                    Edusphere is a learning management system (LMS) that provides a comprehensive platform for educational institutions to manage and deliver online learning content. It is a cloud-based software designed to meet the needs of schools, colleges, universities, and other training organizations.
                </p>
                <p style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.5', 
                    marginBottom: '30px' 
                }}>
                    The platform includes tools for creating, managing, and delivering online courses and materials, as well as tracking student progress and performance. It also provides features for collaboration, communication, and assessment.
                </p>
                <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '20px' 
                }}>
                    Edusphere's Features:
                </h2>
                <ul style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.5', 
                    marginBottom: '30px' 
                }}>
                    <li>Course creation: Educators can easily create online courses, lessons, and assignments using a variety of multimedia tools such as videos, audio, and images.</li>
                    <li>Course management: Administrators can manage course schedules, enrollments, and permissions for students and instructors.</li>
                    <li>Assessment and evaluation: Educators can create and grade assignments, quizzes, and tests, and monitor student progress and performance.</li>
                    <li>Communication and collaboration: Edusphere provides tools for real-time communication and collaboration, including discussion forums, messaging, and video conferencing.</li>
                    <li>Reporting and analytics: Administrators can generate reports and analytics on student progress, course completion rates, and other performance metrics.</li>
                </ul>
                <p style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.5', 
                    marginBottom: '30px' 
                }}>
                    Edusphere is user-friendly and can be customized to suit the specific needs of an educational institution. It is an all-in-one solution that provides a seamless experience for both educators and students.
                </p>
                </div>
            </section>
        </React.Fragment>
    )
}

export default MainContent;