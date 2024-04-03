import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import {
   FaEye,
   FaRegEdit,
   FaLock,
   FaLockOpen,
   FaCommentAlt,
   FaTrash,
} from 'react-icons/fa';

import { BsThreeDotsVertical } from 'react-icons/bs';

const ItemMenuAction = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 0.8rem;
`;

const ItemMenu = ({ handleFunction, icon, label, record }) => {
   if (!handleFunction) return null;

   return (
      <Dropdown.Item
         className='item-action'
         onClick={() => handleFunction(record)}
      >
         <ItemMenuAction>
            {icon}
            {label}
         </ItemMenuAction>
      </Dropdown.Item>
   );
};

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
               <ItemMenu
                  handleFunction={handleView}
                  icon={<FaEye />}
                  label='View'
                  record={record}
               />
            )}

            {handleEditClick && (
               <ItemMenu
                  handleFunction={handleEditClick}
                  icon={<FaRegEdit />}
                  label='Edit'
                  record={record}
               />
            )}

            {handleDelete && (
               <ItemMenu
                  handleFunction={handleDelete}
                  icon={<FaTrash />}
                  label='Delete'
                  record={record}
               />
            )}

            {handleReview && (
               <ItemMenu
                  handleFunction={handleReview}
                  icon={<FaCommentAlt />}
                  label='Review'
                  record={record}
               />
            )}

            {handleActivate && (
               <ItemMenu
                  handleFunction={handleActivate}
                  icon={<FaLockOpen />}
                  label='Activate'
                  record={record}
               />
            )}

            {handleDeactivate && (
               <ItemMenu
                  handleFunction={handleDeactivate}
                  icon={<FaLock />}
                  label='Deactivate'
                  record={record}
               />
            )}
         </Dropdown.Menu>
      </Dropdown>
   );
};

export default TableActions;
