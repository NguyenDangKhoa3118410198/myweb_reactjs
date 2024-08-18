import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { todoList, deleteTodo, isCompletedTodo } from '../../Data/fetchData';
import { formattedDateAndTime } from '../../ulti';
import './todolist.css';
import TodoForm from './TodoForm';
import {
   closestCenter,
   DndContext,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import SortableItem from './SortableItem ';

interface ITodo {
   id: string;
   completed: boolean;
   task: string;
   created?: string;
}

const Todolist = () => {
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

   function handleDragEnd(event: any) {
      const { active, over } = event;

      if (active.id !== over.id) {
         setTodolist((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
         });
      }
   }

   const sensors = useSensors(
      useSensor(MouseSensor, {
         activationConstraint: {
            distance: 8,
         },
      }),
      useSensor(TouchSensor, {
         activationConstraint: {
            delay: 200,
            tolerance: 6,
         },
      })
   );

   return (
      <Container>
         <TodoForm
            setTodolist={setTodolist}
            setTodo={setTodo}
            todo={todo}
            scrollToBottom={scrollToBottom}
         />
         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
         >
            <SortableContext items={todolist}>
               <div className='todolist'>
                  <div className='todoscroll' ref={todoListRef}>
                     {todolist.length > 0 ? (
                        todolist.map((todo) => {
                           const { id, task, completed, created: time } = todo;
                           const formattedDateTime = formattedDateAndTime(time);
                           return (
                              <SortableItem
                                 key={id}
                                 id={id}
                                 task={task}
                                 completed={completed}
                                 formattedDateTime={formattedDateTime}
                                 handleToggleTodo={handleToggleTodo}
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
                              fontWeight: '600',
                              fontSize: '18px',
                           }}
                        >
                           Nothing left to do. Your task is completed.
                        </p>
                     )}
                  </div>
               </div>
            </SortableContext>
         </DndContext>
      </Container>
   );
};

export default Todolist;
