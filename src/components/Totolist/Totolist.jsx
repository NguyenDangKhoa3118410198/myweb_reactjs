import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
   todoList,
   addTodo,
   deleteTodo,
   isCompletedTodo,
} from '../../Data/fetchData';
import { formattedDateAndTime } from '../../ulti';
import './todolist.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

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
         <TodoForm
            setTodolist={setTodolist}
            setTodo={setTodo}
            handleKeyDown={handleKeyDown}
            todo={todo}
         />
         <div className='todolist'>
            {todolist && todolist.length > 0 ? (
               todolist.map((todo) => {
                  const { id, task, completed, created: time } = todo;
                  const formattedDateTime = formattedDateAndTime(time);
                  return (
                     <Todo
                        id={id}
                        task={task}
                        completed={completed}
                        formattedDateTime={formattedDateTime}
                        handleIsCompleted={handleToggleTodo}
                        handleDelete={handleDeleteTodo}
                     />
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
