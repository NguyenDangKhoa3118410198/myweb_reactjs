import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { BsThreeDotsVertical } from 'react-icons/bs';

const TableActions = ({
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
   record,
}) => {
   return (
      <Dropdown>
         <Dropdown.Toggle className='table-actions'>
            <BsThreeDotsVertical />
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <Dropdown.Item
               className='item-action'
               onClick={() => handleView(record)}
            >
               View
            </Dropdown.Item>
            <Dropdown.Item
               className='item-action'
               onClick={() => handleEditClick(record)}
            >
               Edit
            </Dropdown.Item>
            <Dropdown.Item
               className='item-action'
               onClick={() => handleDelete(record)}
            >
               Delete
            </Dropdown.Item>
            {handleReview && (
               <Dropdown.Item
                  className='item-action'
                  onClick={() => handleReview(record)}
               >
                  Review
               </Dropdown.Item>
            )}
         </Dropdown.Menu>
      </Dropdown>
   );
};

export default TableActions;
