import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { UilTrashAlt } from '@iconscout/react-unicons';
import {
   todoList,
   addTodo,
   deleteTodo,
   isCompletedTodo,
} from '../../Data/fetchData';

import './todolist.css';

function Todolist() {
   const [todo, setTodo] = useState('');
   const [todolist, setTodolist] = useState();

   useEffect(() => {
      todoList(setTodolist);
   }, []);

   const handleAddTodo = async (e) => {
      e.preventDefault();
      const task = todo.trim();
      if (task.length !== 0) {
         const response = await addTodo({ task });
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

   return (
      <Container className='todolist-container'>
         <Form className='todo-form-container' onSubmit={handleAddTodo}>
            <Form.Group controlId='newTodo'>
               <Form.Control
                  type='text'
                  className='new-todo-input'
                  placeholder='New todo'
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
               />
            </Form.Group>
            <Button type='submit' className='add-todo'>
               Add
            </Button>
         </Form>
         <div className='todolist'>
            {todolist && todolist.length > 0 ? (
               todolist.map((todo) => (
                  <div className='todo' key={todo.id}>
                     <div className='todo-content'>
                        <input
                           className='todo-checkbox'
                           type='checkbox'
                           onChange={() => handleToggleTodo(todo.id)}
                           checked={todo.completed}
                        />
                        <span
                           className={`${todo.completed ? 'completed' : ''}`}
                        >
                           {todo.task}
                        </span>
                     </div>
                     <div>
                        <UilTrashAlt
                           className='todo-delete'
                           onClick={() => handleDeleteTodo(todo.id)}
                        />
                     </div>
                  </div>
               ))
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
