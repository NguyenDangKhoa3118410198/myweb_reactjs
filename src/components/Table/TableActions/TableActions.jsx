import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { BsThreeDotsVertical } from 'react-icons/bs';

function TableActions(handleEditClick, handleDelete, record) {
   return (
      <Dropdown>
         <Dropdown.Toggle className='table-actions'>
            <BsThreeDotsVertical />
         </Dropdown.Toggle>

         <Dropdown.Menu>
            <Dropdown.Item className='item-action'>View</Dropdown.Item>
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
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default TableActions;
