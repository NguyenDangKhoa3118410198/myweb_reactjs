import React from 'react';
import './infoWeb.css';

const InfoWeb = () => {
   return (
      <div className='info-web-container'>
         <header className='info-web-header'>
            <h1>Personal Learning Website</h1>
         </header>

         <section className='info-web-section'>
            <p>
               Welcome! This website is designed using ReactJS, Bootstrap, and
               Ant Design to create the user interface, with API calls and Redux
               for data management. The data is presented in the form of tables,
               charts, and more. The purpose of this website is to enhance
               personal skills.
            </p>

            <div className='info-web-wrapper'>
               <h2>Main Information</h2>
               <ul className='info-web-content'>
                  <li>
                     <strong>Type:</strong> Learning Resource
                  </li>
                  <li>
                     <strong>Purpose:</strong> Practice Personal Skills
                  </li>
                  <li>
                     <strong>Language:</strong> English
                  </li>
               </ul>
            </div>
            <div className='info-web-wrapper'>
               <h2>Featured Technologies</h2>
               <p>This website is built with the following technologies:</p>
               <ul className='info-web-content'>
                  <li>React Components</li>
                  <li>State, Props, and Redux</li>
                  <li>React Hooks</li>
                  <li>API Integration</li>
                  <li>Bootstrap and Ant Design</li>
               </ul>
            </div>
            <div className='info-web-wrapper'>
               <h2>Backend Technologies</h2>
               <p>The backend is developed using:</p>
               <ul className='info-web-content'>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>NodeMailer</li>
                  <li>JWT (JSON Web Tokens)</li>
               </ul>
            </div>

            <h2>Contact</h2>
            <p>
               If you notice any issues or errors, please understand that this
               is a personal project. Your understanding is greatly appreciated.
            </p>
         </section>
      </div>
   );
};

export default InfoWeb;
