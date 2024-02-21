import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const HorizontalNavigation = ({ onItemClick }) => {
  const [selected, setSelected] = useState('Home');
  const { courseId } = useParams();
  const title = localStorage.getItem('courseTitle');
  const route = {
    Home: `/${courseId}`,
    Syllabus: `/${courseId}/syllabus`,
    Announcements: `/${courseId}/announcements`,
    Modules: `/${courseId}/modules`,
    Assignments: `/${courseId}/assignments`,
    Grading: `/${courseId}/grading`,
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[3];
    if (path === '' || path === courseId) {
      setSelected('Home');
    } else if (path === 'syllabus') {
      setSelected('Syllabus');
    } else if (path === 'announcements') {
      setSelected('Announcements');
    } else if (path === 'modules') {
      setSelected('Modules');
    } else if (path === 'assignments') {
      setSelected('Assignments');
    } else if (path === 'grading') {
      setSelected('Grading');
    }
  }, [location.pathname, courseId]);

  const handleItemClick = (item) => {
    setSelected(item);
    navigate('/course' + route[item]);
  };

  return (
    <NavWrapper>
      <CourseTitle>{title}</CourseTitle>
      <NavList>
        {Object.keys(route).map((key) => (
          <NavItem
            key={key}
            selected={selected === key}
            onClick={() => handleItemClick(key)}
          >
            <StyledLink to={route[key]}>{key}</StyledLink>
          </NavItem>
        ))}
      </NavList>
    </NavWrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const NavWrapper = styled.div`
//   position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  padding-top:10px;
  padding-bottom:10px;
  margin-top:0px;
  margin-left: 0%; /* the width of the vertical navigation */
  width: 100%; /* adjust as needed */
`;

const CourseTitle = styled.h2`
  font-size: 16px;
  margin-top: 5px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const NavItem = styled.li`
  font-size: 15px;
  font-family: Arial;
  margin-right: 20px;
  padding-bottom: 5px;
  border-bottom: 3px solid transparent;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
//   color: ${({ selected }) => (selected ? '#000' : '#999')};
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background-color: #000;
  }
`;

export default HorizontalNavigation;
