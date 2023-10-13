import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './progressbar.css';

function ContextualExample() {
   const [countOfProgess, setCountOfProgess] = useState(0);
   const [countOfProgessSuccess, setCountOfProgessSuccess] = useState(0);
   const [countOfProgessWarning, setCountOfProgessWarning] = useState(0);

   React.useEffect(() => {
      const timer = setInterval(() => {
         setCountOfProgess((oldProgress) => {
            if (100 === oldProgress) return 0;
            return parseInt(
               Math.min(oldProgress + Math.random() * 10, 100),
               10
            );
         });

         setCountOfProgessSuccess((oldProgress) => {
            if (100 === oldProgress) return 0;
            return parseInt(
               Math.min(oldProgress + Math.random() * 10, 100),
               10
            );
         });

         setCountOfProgessWarning((oldProgress) => {
            if (100 === oldProgress) return 0;
            return parseInt(
               Math.min(oldProgress + Math.random() * 10, 100),
               10
            );
         });
      }, 1900);

      return () => {
         clearInterval(timer);
      };
   }, []);
   return (
      <div className='progress-container'>
         <h1 className='progress-title'>Progress</h1>
         <div className='progress-bar-content'>
            <p className='title-progress-bar'>
               Export report is: {parseInt(countOfProgess)} %
            </p>
            <ProgressBar
               animated
               now={countOfProgess}
               label={`${countOfProgess}%`}
               className='custom-progress-bar'
            />
            <p className='title-progress-bar'>
               Dowwnload file is: {parseInt(countOfProgessSuccess)} %
            </p>
            <ProgressBar
               animated
               now={countOfProgessSuccess}
               label={`${countOfProgessSuccess}%`}
               variant='success'
               className='custom-progress-bar'
            />
            <p className='title-progress-bar'>
               User access is: {parseInt(countOfProgessWarning)} %
            </p>
            <ProgressBar
               animated
               now={countOfProgessWarning}
               label={`${countOfProgessWarning}%`}
               striped
               variant='warning'
               className='custom-progress-bar'
            />

            <p className='title-progress-bar'>Error System is: 10 %</p>
            <ProgressBar
               variant='danger'
               now={10}
               className='custom-progress-bar'
            />
         </div>
      </div>
   );
}

export default ContextualExample;
