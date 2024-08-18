import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Todo from './Todo';

interface FormattedDateTime {
   date: string;
   time: string;
}

interface SortableItemProps {
   id: string;
   task: string;
   completed: boolean;
   formattedDateTime: FormattedDateTime;
   handleToggleTodo: (id: string) => void;
   handleDelete: (id: string) => void;
}

function SortableItem({
   id,
   task,
   completed,
   formattedDateTime,
   handleToggleTodo,
   handleDelete,
}: SortableItemProps) {
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: 'grabbing',
   };

   return (
      <>
         <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Todo
               id={id}
               task={task}
               completed={completed}
               formattedDateTime={formattedDateTime}
               handleIsCompleted={handleToggleTodo}
               handleDelete={handleDelete}
            />
         </div>
      </>
   );
}

export default SortableItem;
