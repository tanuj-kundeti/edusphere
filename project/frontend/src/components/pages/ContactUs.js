import React from 'react'
import { useState } from 'react';


const ContactUs = () => {


    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        message: '',
      });

      const [msg, setMsg] = useState("")
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('sending',formData);

    const apiEndpoint = 'http://localhost:8000/api/contact/';
    
    try {
        const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        if(data.Status == "Success"){
            setMsg(data.displayMessage)
        }

        // Clear form data after successful submission
        setFormData({
            name: '',
            subject: '',
            email: '',
            phone: '',
            message: '',
        });

        } catch (error) {
          console.error('Error submitting form data:', error);
        }
      };


    return (
        <React.Fragment>
            <section className="content-container">
                <div className="textArea"> 
                    <h2>Contact Us</h2>
                    <p>
                        We would love to hear from you!.<br/>
                        For any enquiries, feel free to drop us an email!
                    </p>
                    <p>
                        How can we help you?
                    </p>
                </div>

                <div className="block">
                    <div className="row">
                        <div className="col-left">
                            <form id="contact" onSubmit={handleSubmit}>
                                <h4>Leave us a message</h4>
                                <fieldset>
                                    <input placeholder="Your Name" name="name" type="text" tabIndex="1" required 
                                    autoFocus value={formData.name} onChange={handleChange} />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Subject" name="subject" type="text" tabIndex="2" required 
                                    autoFocus value={formData.subject} onChange={handleChange}/>
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Your Email Address" name="email" type="email" tabIndex="3" 
                                    required autoFocus value={formData.email} onChange={handleChange} />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Your Phone Number"  name="phone" type="tel" tabIndex="4" 
                                    required autoFocus value={formData.phone} onChange={handleChange}/>
                                </fieldset>
                                <fieldset>
                                    <textarea placeholder="Type your Message Here...." tabIndex="5" name="message"
                                    required autoFocus value={formData.message} onChange={handleChange}></textarea>
                                </fieldset>
                                <fieldset>
                                    <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                                </fieldset>
                                {msg != "" ?
                                    <p>{msg}</p>
                                :
                                    null
                                }
                            </form>
                        </div>
                        <div className="col-right">
                            <div id="details">
                                <h4>Drop by our Office</h4>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="fa fa-map-marker fa- " ></i></td>
                                            <td>EduSphere HO,<br />
                                                700 N Woodlawn Ave<br />
                                                Bloomington, IN<br />
                                                47408<br />
                                                United States. 
                                                <p></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-phone fa- " ></i></td>
                                            <td>Phone No : +1 888-0000-8888</td>
                                        </tr>
                                        {/* <tr>
                                            <td><i className="fa fa-clock-o fa- " ></i></td>
                                            <td>
                                                Operation Time:<br />
                                                9.00 am – 5.30 pm (Mon – Sat) <br />
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td><i className="fa fa-envelope fa- " ></i></td>
                                            <td>Email : support@edusphere.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ContactUs;