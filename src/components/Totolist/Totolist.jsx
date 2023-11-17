import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
            {todolist.length > 0 ? (
               todolist.map((todo) => (
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
