import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { BsThreeDotsVertical } from 'react-icons/bs';

const TableActions = ({
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
   handleDeactivate,
   handleActivate,
   record,
}) => {
   return (
      <Dropdown>
         <Dropdown.Toggle className='table-actions'>
            <BsThreeDotsVertical />
         </Dropdown.Toggle>

         <Dropdown.Menu>
            {handleView && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleView(record)}
               >
                  View
               </Dropdown.Item>
            )}

            {handleEditClick && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleEditClick(record)}
               >
                  Edit
               </Dropdown.Item>
            )}

            {handleDelete && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleDelete(record)}
               >
                  Delete
               </Dropdown.Item>
            )}

            {handleReview && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleReview(record)}
               >
                  Review
               </Dropdown.Item>
            )}

            {handleActivate && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleActivate(record)}
               >
                  Active
               </Dropdown.Item>
            )}

            {handleDeactivate && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleDeactivate(record)}
               >
                  Deactivate
               </Dropdown.Item>
            )}
         </Dropdown.Menu>
      </Dropdown>
   );
};

export default TableActions;
