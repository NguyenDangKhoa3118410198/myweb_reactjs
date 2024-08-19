import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip, Menu } from 'antd';
import { MenuProps } from 'antd/lib';
import { FaCalendar, FaClock, FaRegTrashAlt } from 'react-icons/fa';

interface TodoProps {
   id: string;
   task: string;
   completed: boolean;
   formattedDateTime: {
      date: string;
      time: string;
   };
   handleIsCompleted: (id: string) => void;
   handleDelete: (id: string) => void;
}

const Todo = ({
   id,
   task,
   completed,
   formattedDateTime,
   handleIsCompleted,
   handleDelete,
}: TodoProps) => {
   const handleMenuClick: MenuProps['onClick'] = (e) => {
      if (e.key === 'delete') {
         handleDelete(id);
      }
   };

   const menu = (
      <Menu className='' onClick={handleMenuClick}>
         <Menu.Item key='delete' icon={<FaRegTrashAlt />}>
            Delete
         </Menu.Item>
      </Menu>
   );

   return (
      <div
         className='todo'
         key={id}
         style={{
            borderLeft: `8px solid ${
               completed ? 'var(--color-green-01)' : 'var(--color-yellow)'
            }`,
         }}
      >
         <div className='todo-content'>
            <input
               className='todo-checkbox'
               type='checkbox'
               onChange={() => handleIsCompleted(id)}
               checked={completed}
            />
            <Tooltip
               title={
                  <div
                     style={{ display: 'flex', alignItems: 'center' }}
                     className='container-todo-daytime'
                  >
                     <FaCalendar className='icon-todo' />
                     <span>{formattedDateTime.date}</span>
                     <FaClock className='icon-todo' style={{ marginLeft: 8 }} />
                     <span>{formattedDateTime.time}</span>
                  </div>
               }
               placement='left'
            >
               <div className='container-todo'>
                  <span
                     className={`todo-text ${completed ? 'completed' : ''} `}
                  >
                     {task}
                  </span>
               </div>
            </Tooltip>
         </div>
         <Dropdown overlay={menu} trigger={['click']}>
            <div
               className='combined-stats-icon'
               style={{ color: 'var(--color-black)' }}
            >
               <EllipsisOutlined />
            </div>
         </Dropdown>
      </div>
   );
};

export default Todo;
