import { useEffect, useRef, useState, useMemo } from 'react';
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
   const [activeFilter, setActiveFilter] = useState<string>('All');

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

   const handleActiveFilter = (filter: string) => {
      setActiveFilter(filter);
   };

   const filteredTodolist = useMemo(() => {
      if (activeFilter === 'Done') {
         return todolist.filter((item) => item.completed);
      } else if (activeFilter === 'Waitting') {
         return todolist.filter((item) => !item.completed);
      } else {
         return todolist;
      }
   }, [todolist, activeFilter]);

   return (
      <div className='todolist-container'>
         <TodoForm
            setTodolist={setTodolist}
            setTodo={setTodo}
            todo={todo}
            scrollToBottom={scrollToBottom}
         />
         <div className='todolist-filter'>
            <div
               className={`todo-item-filter all ${
                  activeFilter === 'All' ? 'active' : ''
               }`}
               onClick={() => handleActiveFilter('All')}
            >
               All
            </div>
            <div
               className={`todo-item-filter waitting ${
                  activeFilter === 'Waitting' ? 'active' : ''
               }`}
               onClick={() => handleActiveFilter('Waitting')}
            >
               Waitting
            </div>
            <div
               className={`todo-item-filter done ${
                  activeFilter === 'Done' ? 'active' : ''
               }`}
               onClick={() => handleActiveFilter('Done')}
            >
               Completed
            </div>
         </div>
         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
         >
            <SortableContext items={filteredTodolist}>
               <div className='todolist'>
                  <div className='todoscroll' ref={todoListRef}>
                     {filteredTodolist.length > 0 ? (
                        filteredTodolist.map((todo) => {
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
      </div>
   );
};

export default Todolist;
