import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import {
   CheckCircleOutlined,
   CloseCircleOutlined,
   CommentOutlined,
   DeleteOutlined,
   EditOutlined,
   EyeOutlined,
   MoreOutlined,
} from '@ant-design/icons';

interface ItemMenuProps {
   handleFunction?: (record: any) => void;
   icon: React.ReactNode;
   label?: string;
   record: any;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
   handleFunction,
   icon,
   label,
   record,
}) => {
   if (!handleFunction) return null;

   return (
      <Dropdown.Item
         className='item-action-table'
         onClick={() => handleFunction(record)}
      >
         <ItemMenuAction>
            <span className='icon'>{icon}</span>
            {label ?? null}
         </ItemMenuAction>
      </Dropdown.Item>
   );
};

interface TableActionsProps {
   handleView?: (record: any) => void;
   handleEditClick?: (record: any) => void;
   handleDelete?: (record: any) => void;
   handleReview?: (record: any) => void;
   handleDeactivate?: (record: any) => void;
   handleActivate?: (record: any) => void;
   record: any;
}

const TableActions: React.FC<TableActionsProps> = ({
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
   handleDeactivate,
   handleActivate,
   record,
}) => {
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         <Dropdown>
            <MenuWarpper>
               {handleView && (
                  <ItemMenu
                     handleFunction={handleView}
                     icon={<EyeOutlined />}
                     record={record}
                  />
               )}

               {handleEditClick && (
                  <ItemMenu
                     handleFunction={handleEditClick}
                     icon={<EditOutlined />}
                     record={record}
                  />
               )}
               <Dropdown.Toggle className='table-actions'>
                  <MoreOutlined />
               </Dropdown.Toggle>

               <Dropdown.Menu>
                  {/* {handleView && (
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
               )} */}

                  {handleDelete && (
                     <ItemMenu
                        handleFunction={handleDelete}
                        icon={<DeleteOutlined />}
                        label='Delete'
                        record={record}
                     />
                  )}

                  {handleReview && (
                     <ItemMenu
                        handleFunction={handleReview}
                        icon={<CommentOutlined />}
                        label='Review'
                        record={record}
                     />
                  )}

                  {handleActivate && (
                     <ItemMenu
                        handleFunction={handleActivate}
                        icon={<CheckCircleOutlined />}
                        label='Activate'
                        record={record}
                     />
                  )}

                  {handleDeactivate && (
                     <ItemMenu
                        handleFunction={handleDeactivate}
                        icon={<CloseCircleOutlined />}
                        label='Deactivate'
                        record={record}
                     />
                  )}
               </Dropdown.Menu>
            </MenuWarpper>
         </Dropdown>
      </div>
   );
};

export default TableActions;

const MenuWarpper = styled.div`
   display: flex;
   justify-content: center;
   align-content: center;
`;

const ItemMenuAction = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 0.8rem;
   margin: 0 0.2rem;

   .icon {
      font-size: 20px;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
         color: var(--color-blue-03);
      }
   }
`;
