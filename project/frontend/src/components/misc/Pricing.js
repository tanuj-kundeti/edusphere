import React from 'react'
import './Pricing.css'

const Home = () => {

    function handleOnClick() {
        window.location.href = 'https://edusphere-lms.netlify.app/ContactUs';
      }

    return (
        <React.Fragment>
            <section className="content-container">
            <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                textAlign: 'center' 
            }}>
                    Pricing
            </h2>
            <div className="columns">
                <ul className="price">
                    <li className="col-header">Basic</li>
                    <li className="grey">Free</li>
                    <li>5 consultation sessions</li>
                    <li>10k users</li>
                    <li>Same day audit logs</li>
                    <li>Communiity support</li>
                    <li className="grey"><button className="button" style={{cursor:"pointer"}} onClick={handleOnClick}>Contact us</button></li>
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                    <li className="col-header" style={{backgroundColor:'#37387a'}}>Pro</li>
                    <li className="grey">$ 29.99 / year</li>
                    <li>Unlimited Consultation</li>
                    <li>1000k users</li>
                    <li>7 days Audit logs</li>
                    <li>7 days SLA support</li>
                    <li className="grey"><button className="button" style={{cursor:"pointer"}} onClick={handleOnClick}>Contact us</button></li>
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                    <li className="col-header">Premium</li>
                    <li className="grey">$ 49.99 / year</li>
                    <li>Unlimited Consultation</li>
                    <li>Unlimiited Users*</li>
                    <li>Audit logs with full history</li>
                    <li>24×7×365 instant support</li>
                    <li className="grey"><button className="button" style={{cursor:"pointer"}} onClick={handleOnClick}>Contact us</button></li>
                </ul>
            </div>
            </section>
        </React.Fragment>
    )
}

export default Home;