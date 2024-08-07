import { EllipsisOutlined } from '@ant-design/icons';
import ContextualExample from 'components/ProgressBar';
import CircularProgressbarChart from 'components/Statistics/ChartTemplate/CircularProgressbarChart';
import Todolist from 'components/Totolist/Totolist';

const TopRevenueStats = () => (
   <div className='combined-stats-item'>
      <div className='combined-stats-header'>
         <h1 className='combined-stats-title'>Top Revenue</h1>
         <div className='combined-stats-icon'>
            <EllipsisOutlined />
         </div>
      </div>
      <div className='combined-stats-content'>
         <CircularProgressbarChart />
      </div>
   </div>
);

const TodolistStats = () => (
   <div className='combined-stats-item'>
      <div className='combined-stats-header'>
         <h1 className='combined-stats-title'>Todolist</h1>
         <div className='combined-stats-icon'>
            <EllipsisOutlined />
         </div>
      </div>
      <div className='combined-stats-content'>
         <Todolist />
      </div>
   </div>
);

const ProgressChartStats = () => (
   <div className='combined-stats-item'>
      <div className='combined-stats-header'>
         <h1 className='combined-stats-title'>Progress Chart</h1>
         <div className='combined-stats-icon'>
            <EllipsisOutlined />
         </div>
      </div>
      <div className='combined-stats-content'>
         <ContextualExample />
      </div>
   </div>
);

export { TopRevenueStats, TodolistStats, ProgressChartStats };
