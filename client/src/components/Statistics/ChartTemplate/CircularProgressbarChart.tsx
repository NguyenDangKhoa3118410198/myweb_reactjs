import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './circularProgressbarChart.css';

const CircularProgressbarChart = () => {
   const percentage = 60;
   return (
      <div className='circular-container'>
         <div className='circular-content'>
            <div className='circular-chart'>
               <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                     textColor: '#4B9BEF',
                     pathColor: '#4B9BEF',
                     trailColor: '#E7E9EB',
                  })}
               />
            </div>
            <p className='circular-day'>Total sales to day</p>
            <p className='circular-amount'>$420</p>
            <p className='circular-desc'>
               Previous transactions processing. Last payments may not be
               included
            </p>
         </div>
      </div>
   );
};

export default CircularProgressbarChart;
