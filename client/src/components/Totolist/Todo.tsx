import { FaCalendar, FaClock, FaRegTrashAlt } from 'react-icons/fa'; // Thay đổi từ FaClock thành FaTrashAlt

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

function Todo({
   id,
   task,
   completed,
   formattedDateTime,
   handleIsCompleted,
   handleDelete,
}: TodoProps) {
   return (
      <div className='todo' key={id}>
         <div className='todo-content'>
            <input
               className='todo-checkbox'
               type='checkbox'
               onChange={() => handleIsCompleted(id)}
               checked={completed}
            />
            <div className='container-todo'>
               <div className='container-todo-daytime'>
                  <div className='date-time-todolist'>
                     <FaCalendar className='icon-todo' />
                     <p className='time-todo'>{formattedDateTime.date}</p>
                  </div>
                  <div className='date-time-todolist'>
                     <FaClock className='icon-todo' />
                     <p className='time-todo'>{formattedDateTime.time}</p>
                  </div>
               </div>

               <span className={`${completed ? 'completed' : ''} `}>
                  {task}
               </span>
            </div>
         </div>
         <div className='todo-delete-wrapper' onClick={() => handleDelete(id)}>
            <FaRegTrashAlt
               className='todo-delete'
               onClick={() => handleDelete(id)}
            />
         </div>
      </div>
   );
}

export default Todo;
