import { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { UilTrashAlt } from '@iconscout/react-unicons';
import {
   todoList,
   addTodo,
   deleteTodo,
   isCompletedTodo,
} from '../../Data/fetchData';
import { formattedDateAndTime } from '../../ulti';
import { FaCalendar, FaClock } from 'react-icons/fa';
import PrimaryButton from 'components/common/ButtonPrimary';
import './todolist.css';

function Todolist() {
   const [todo, setTodo] = useState('');
   const [todolist, setTodolist] = useState();

   useEffect(() => {
      todoList(setTodolist);
   }, []);

   const handleAddTodo = async (e) => {
      e.preventDefault();
      const trimmedTask = todo.trim();
      if (trimmedTask) {
         const response = await addTodo({ task: trimmedTask });
         setTodolist((prevTodolist) => [...prevTodolist, response]);
      }
      setTodo('');
   };

   const handleToggleTodo = (id) => {
      isCompletedTodo(id);
      setTodolist(
         todolist.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   };

   const handleDeleteTodo = (id) => {
      deleteTodo(id);
      setTodolist(todolist.filter((todo) => todo.id !== id));
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter' && todo.trim() !== '') {
         handleAddTodo(e);
      }
   };

   return (
      <Container className='todolist-container'>
         <Form className='todo-form-container' onSubmit={handleAddTodo}>
            <Form.Group
               controlId='newTodo'
               className='container-new-todo-input'
            >
               <Form.Control
                  type='text'
                  className='new-todo-input'
                  placeholder='New todo'
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  onKeyDown={handleKeyDown}
               />
            </Form.Group>
            <PrimaryButton
               label='Enter'
               htmlType='submit'
               style={{ margin: '10px' }}
            ></PrimaryButton>
         </Form>
         <div className='todolist'>
            {todolist && todolist.length > 0 ? (
               todolist.map((todo) => {
                  const formattedDateTime = formattedDateAndTime(todo.created);
                  return (
                     <div className='todo' key={todo.id}>
                        <div className='todo-content'>
                           <input
                              className='todo-checkbox'
                              type='checkbox'
                              onChange={() => handleToggleTodo(todo.id)}
                              checked={todo.completed}
                           />
                           <div className='container-todo'>
                              <div className='container-todo-daytime'>
                                 <div className='date-time-todolist'>
                                    <FaCalendar className='icon-todo' />
                                    <p className='time-todo'>
                                       {formattedDateTime.date}
                                    </p>
                                 </div>
                                 <div className='date-time-todolist'>
                                    <FaClock className='icon-todo' />
                                    <p className='time-todo'>
                                       {formattedDateTime.time}
                                    </p>
                                 </div>
                              </div>

                              <span
                                 className={`${
                                    todo.completed ? 'completed' : ''
                                 } `}
                              >
                                 {todo.task}
                              </span>
                           </div>
                        </div>
                        <div className='todo-delete-wrapper'>
                           <UilTrashAlt
                              className='todo-delete'
                              onClick={() => handleDeleteTodo(todo.id)}
                           />
                        </div>
                     </div>
                  );
               })
            ) : (
               <p
                  style={{
                     padding: '10px',
                     textTransform: 'capitalize',
                     textAlign: 'center',
                     fontWeight: '400',
                     fontSize: '1.5rem',
                  }}
               >
                  Nothing left to do. Your task is completed.
               </p>
            )}
         </div>
      </Container>
   );
}

export default Todolist;
