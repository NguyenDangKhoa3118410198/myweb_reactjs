import {
   setSettingProgressChart,
   setSettingTodolist,
   setSettingTopRevenue,
} from 'components/features/setting/settingSlice';
import ContextualExample from 'components/ProgressBar';
import CircularProgressbarChart from 'components/Statistics/ChartTemplate/CircularProgressbarChart';
import Todolist from 'components/Totolist/Totolist';
import { useAppDispatch } from 'hooks/useAppDispatch';
import StatsCard from './StatsCard';

const TopRevenueStats = () => {
   const dispatch = useAppDispatch();
   return (
      <StatsCard
         title='Top Revenue'
         onHide={() => dispatch(setSettingTopRevenue(false))}
         content={<CircularProgressbarChart />}
      />
   );
};

const TodolistStats = () => {
   const dispatch = useAppDispatch();
   return (
      <StatsCard
         title='Todolist'
         onHide={() => dispatch(setSettingTodolist(false))}
         content={<Todolist />}
      />
   );
};

const ProgressChartStats = () => {
   const dispatch = useAppDispatch();
   return (
      <StatsCard
         title='Progress Chart'
         onHide={() => dispatch(setSettingProgressChart(false))}
         content={<ContextualExample />}
      />
   );
};

export { TopRevenueStats, TodolistStats, ProgressChartStats };
