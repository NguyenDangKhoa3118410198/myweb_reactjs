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
         <p className='title-progress-bar'>
            Current Progress is: {parseInt(countOfProgess)} %
         </p>
         <ProgressBar
            animated
            now={countOfProgess}
            label={`${countOfProgess}%`}
            className='custom-progress-bar'
         />
         <p className='title-progress-bar'>
            Current Progress Success is: {parseInt(countOfProgessSuccess)} %
         </p>
         <ProgressBar
            animated
            now={countOfProgessSuccess}
            label={`${countOfProgessSuccess}%`}
            variant='success'
            className='custom-progress-bar'
         />
         <p className='title-progress-bar'>
            Current Progress Warning is: {parseInt(countOfProgessWarning)} %
         </p>
         <ProgressBar
            animated
            now={countOfProgessWarning}
            label={`${countOfProgessWarning}%`}
            striped
            variant='warning'
            className='custom-progress-bar'
         />

         <p className='title-progress-bar'>Current Progress Danger is: 80 %</p>
         <ProgressBar
            variant='danger'
            now={80}
            className='custom-progress-bar'
         />
      </div>
   );
}

export default ContextualExample;
