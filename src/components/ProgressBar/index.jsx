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
         <div className='progress-bar-content'>
            <div className='info-channel'>
               <span className='title-progress-bar'>
                  Facebook: {parseInt(countOfProgess)} %
               </span>
               <div className='channel-container'>
                  <div className='icon-channel'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='35'
                        height='35'
                        viewBox='0 0 48 48'
                     >
                        <path
                           fill='#3F51B5'
                           d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'
                        ></path>
                        <path
                           fill='#FFF'
                           d='M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z'
                        ></path>
                     </svg>
                  </div>

                  <ProgressBar
                     striped
                     now={countOfProgess}
                     label={`${countOfProgess}%`}
                     className='custom-progress-bar'
                  />
               </div>
            </div>

            <div className='info-channel'>
               <span className='title-progress-bar'>
                  Google: {parseInt(countOfProgessSuccess)} %
               </span>
               <div className='channel-container'>
                  <div className='icon-channel'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='35'
                        height='35'
                        viewBox='0 0 48 48'
                     >
                        <path
                           fill='#FFC107'
                           d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                        ></path>
                        <path
                           fill='#FF3D00'
                           d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                        ></path>
                        <path
                           fill='#4CAF50'
                           d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                        ></path>
                        <path
                           fill='#1976D2'
                           d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                        ></path>
                     </svg>
                  </div>
                  <ProgressBar
                     striped
                     now={countOfProgessSuccess}
                     label={`${countOfProgessSuccess}%`}
                     variant='custom'
                     className='custom-progress-bar'
                  />
               </div>
            </div>
            <div className='info-channel'>
               <span className='title-progress-bar'>
                  Youtube: {parseInt(countOfProgessWarning)} %
               </span>
               <div className='channel-container'>
                  <div className='icon-channel'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='35'
                        height='35'
                        viewBox='0 0 48 48'
                     >
                        <path
                           fill='#FF3D00'
                           d='M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z'
                        ></path>
                        <path fill='#FFF' d='M20 31L20 17 32 24z'></path>
                     </svg>
                  </div>
                  <ProgressBar
                     striped
                     now={countOfProgessWarning}
                     label={`${countOfProgessWarning}%`}
                     variant='custom'
                     className='custom-progress-bar'
                  />
               </div>
            </div>

            <div className='info-channel'>
               <span className='title-progress-bar'>Twitter</span>
               <div className='channel-container'>
                  <div className='icon-channel'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='35'
                        height='35'
                        viewBox='0 0 48 48'
                     >
                        <path
                           fill='#03A9F4'
                           d='M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429'
                        ></path>
                     </svg>
                  </div>
                  <ProgressBar
                     striped
                     variant='custom'
                     now={50}
                     className='custom-progress-bar'
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default ContextualExample;
