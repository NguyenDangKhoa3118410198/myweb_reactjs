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
               Welcome! This is a personal learning website dedicated to
               studying ReactJS. The site aggregates information and presents it
               in the form of a table and chart.
            </p>

            <h2>Main Information</h2>
            <ul>
               <li>
                  <strong>Type:</strong> Learning Resource
               </li>
               <li>
                  <strong>Purpose:</strong> Study ReactJS
               </li>
               <li>
                  <strong>Language:</strong> English
               </li>
            </ul>

            <h2>Featured Topics</h2>
            <p>This website covers topics such as:</p>
            <ul>
               <li>React Components</li>
               <li>State and Props</li>
               <li>React Hooks</li>
               <li>Building React Applications</li>
            </ul>

            <h2>Contact</h2>
            <p>
               If you notice any violations or errors, please feel free to
               overlook them as this is a personal project. Your understanding
               is greatly appreciated.
            </p>
         </section>
      </div>
   );
};

export default InfoWeb;
