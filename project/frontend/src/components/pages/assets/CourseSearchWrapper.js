import React from 'react';
import ClassSearchPage from './ClassSearchPage';
import InstructorSeacrh from './InstructorSearch';

const CoursePageWrapper = () => {
  const userType = localStorage.getItem('userType');

  return userType.toLowerCase() === 'i' ? <InstructorSeacrh /> : <ClassSearchPage />;
};

export default CoursePageWrapper;
