import React from 'react';
import './contact.css';
import backgroundImage from './bg1.png';

function Contact() {
   return (
      <div className='contact-form'>
         <h1>Contact Us</h1>
         <div className='container-contact'>
            <div className='main-contact'>
               <div className='content-contact'>
                  <h2>Contact Us</h2>
                  <form action='#' method='post'>
                     <input
                        type='text'
                        name='name'
                        placeholder='Enter Your Name'
                     />

                     <input
                        type='email'
                        name='name'
                        placeholder='Enter Your Email'
                     />
                     <textarea
                        name='message'
                        placeholder='Your Message'
                     ></textarea>
                     <button type='submit' className='btn'>
                        Send <i className='fas fa-paper-plane'></i>
                     </button>
                  </form>
               </div>
               <div className='form-img'>
                  <img src={backgroundImage} alt='' />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Contact;
