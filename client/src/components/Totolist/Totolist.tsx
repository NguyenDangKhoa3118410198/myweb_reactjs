import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { todoList, deleteTodo, isCompletedTodo } from '../../Data/fetchData';
import { formattedDateAndTime } from '../../ulti';
import './todolist.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

interface ITodo {
   id: string;
   completed: boolean;
   task: string;
   created?: string;
}

function Todolist() {
   const [todo, setTodo] = useState('');
   const [todolist, setTodolist] = useState<ITodo[]>([]);

   const todoListRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      todoList(setTodolist);
   }, []);

   const scrollToBottom = () => {
      if (todoListRef.current) {
         setTimeout(() => {
            todoListRef.current?.scrollTo({
               top: todoListRef.current.scrollHeight,
               behavior: 'smooth',
            });
         }, 100);
      }
   };

   const handleToggleTodo = (id: string) => {
      isCompletedTodo(id);
      setTodolist(
         todolist.map((todo: ITodo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   };

   const handleDeleteTodo = (id: string) => {
      deleteTodo(id);
      setTodolist(todolist.filter((todo: ITodo) => todo.id !== id));
   };

   return (
      <Container>
         <TodoForm
            setTodolist={setTodolist}
            setTodo={setTodo}
            todo={todo}
            scrollToBottom={scrollToBottom}
         />
         <div className='todolist' ref={todoListRef}>
            {todolist.length > 0 ? (
               todolist.map((todo) => {
                  const { id, task, completed, created: time } = todo;
                  const formattedDateTime = formattedDateAndTime(time);
                  return (
                     <Todo
                        key={id}
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
                     fontWeight: '500',
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
