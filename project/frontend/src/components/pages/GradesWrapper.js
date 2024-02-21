import React from 'react'
import Grades from './Grades';
import StuGrades from './Stugrades';

const GradeWrapper = () =>{
    const userType = localStorage.getItem('userType')
    
    return (
        <>
        {userType.toLowerCase() === 's' ? <StuGrades/>:<Grades/>}
        </>
    )
};

export default GradeWrapper;