import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
    return (
        <React.Fragment>
            <header className="bg-image">
                <div className="bg-container">
                    <h1>Empowering Education, Simplifying Learning</h1>
                    <h2><span style={{fontWeight:"500"}}>EduSphere</span> - Your Ultimate Learning Management System</h2>
                    
                    {/* <h2>Placeholder for home page header</h2> */}
                    {/* <Link to="/">Demo</Link> */}
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;