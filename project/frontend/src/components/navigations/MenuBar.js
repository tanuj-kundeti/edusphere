import React from 'react'

import styles from './MenuBar.module.css'
import EduSphereLogo from '../images/logo/EduSphere.png'; // with import


const MenuBar = () => {
    return (
        <nav className={styles.header}>
            <div className={styles["nav-wrapper"]}>
                <a className={styles.logo} href='/'> 
                    {/* <img src={EduSphereLogo} alt="EduSphere" height={100} />  */}
                    EduSphere
                </a>
                <input className={styles["menu-btn"]} type="checkbox" id="menu-btn"/>
                <label className={styles["menu-icon"]} htmlFor="menu-btn"><span className="navicon"></span></label>

                <ul className={styles.menu}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/AboutUs">About Us</a></li>
                    <li><a href="/ContactUs">Contact Us</a></li>    
                    <li><a href='/login'>Login</a></li>
                    <li><a href='/signup'>Sign Up</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default MenuBar;