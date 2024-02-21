import React from 'react'
import user1 from '../../images/patrick.png'
import user2 from '../../images/nan.jpg'
import './Testimonials.css'


const Home = () => {
    return (
        <React.Fragment>
            <section className="content-container">
                <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                }}>
                        Testimonials
                </h2>
                <p style={{textAlign: 'center' }}>What users say about EduSphere!</p>

                <div className="cust-container">
                    <img src={user1} alt="Avatar" style={{width:"90px"}}/>
                    <p><span>John Doe.</span> - Indiana University</p>
                    <p>"EduSphere is great for the ease of use, responsiveness of customer service if there is an issue, and suggestions are implemented proving that they actually listen to the users."</p>
                </div>

                <div className="cust-container">
                    <img src={user2} alt="Avatar" style={{width:"90px"}}/>
                    <p><span>Rebecca Flex.</span> - New York University</p>
                    <p>"Very quick responses and friendly service. The tools are excellent and are constantly evolving."</p>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Home;