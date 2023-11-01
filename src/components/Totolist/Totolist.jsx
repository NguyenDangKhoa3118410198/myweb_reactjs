import React, { useState } from 'react';
import { UilTrashAlt } from '@iconscout/react-unicons';

import './todolist.css';
import { v4 as uuidv4 } from 'uuid';

function Todolist() {
   const [todo, setTodo] = useState('');
   const [todolist, setTodolist] = useState([
      { id: uuidv4(), task: 'Homework', completed: false },
      { id: uuidv4(), task: 'Running', completed: true },
   ]);

   const handleAddTodo = (e) => {
      e.preventDefault();
      if (todo.trim().length !== 0) {
         setTodolist((prevTodolist) => [
            ...prevTodolist,
            { id: uuidv4(), task: todo.trim(), completed: false },
         ]);
      }
      setTodo('');
   };

   const handleToggleTodo = (id) => {
      setTodolist(
         todolist.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   };

   const handleDeleteTodo = (id) => {
      setTodolist(todolist.filter((todo) => todo.id !== id));
   };

   return (
      <div className='todolist-container'>
         <form className='todo-form-container' onSubmit={handleAddTodo}>
            <input
               type='text'
               className='new-todo-input'
               placeholder='New todo'
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
            />
            <button type='submit' className='add-todo'>
               Add
            </button>
         </form>
         <div className='todolist'>
            {todolist.map((todo) => (
               <div className='todo' key={todo.id}>
                  <span
                     onClick={() => handleToggleTodo(todo.id)}
                     className={`${todo.completed ? 'completed' : ''}`}
                  >
                     {todo.task}
                  </span>

                  <div>
                     <UilTrashAlt
                        className='todo-delete'
                        onClick={() => handleDeleteTodo(todo.id)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Todolist;
