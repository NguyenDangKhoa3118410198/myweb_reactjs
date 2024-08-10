import TableActions from '../components/Table/TableActions/TableActions';

import styled from 'styled-components';

interface StatusStyleProps {
   isActive: boolean;
}

const StatusStyle = styled.div<StatusStyleProps>`
   min-width: 30%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
   padding: 5px 15px;
   color: ${(props) => (props.isActive ? '#6adb89' : '#FF4242')};
   border: 1px solid ${(props) => (props.isActive ? '#6adb89' : '#FF4242')};
   border-radius: 20px;
   background-color: #fff;
`;

const ExampleComponent: React.FC<{
   color: string;
   status: string;
   isActive?: boolean;
}> = ({ color, status, isActive }) => (
   <StatusStyle
      isActive={isActive ?? false}
      style={{
         color: color,
         border: `1px solid ${color}`,
         fontWeight: 600,
      }}
   >
      {status}
   </StatusStyle>
);

export const columnsProduct1 = ({
   handleView = (record: any) => {},
   handleEditClick = (record: any) => {},
   handleDelete = (record: any) => {},
   handleReview = (record: any) => {},
}: {
   handleView?: (record: any) => void;
   handleEditClick?: (record: any) => void;
   handleDelete?: (record: any) => void;
   handleReview?: (record: any) => void;
}) => [
   {
      name: 'Name',
      selector: (row: any) => row.name,
      maxWidth: '250px',
   },
   {
      name: 'Brand',
      selector: (row: any) => row.brandName,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Category',
      selector: (row: any) => row.category,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Url path',
      selector: (row: any) => row.urlPath,
      maxWidth: '300px',
   },
   {
      name: 'Origin price',
      selector: (row: any) => row.originPrice,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Price',
      selector: (row: any) => row.price,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Action',
      center: true,
      minWidth: '100px',
      cell: (record: any) => (
         <TableActions
            handleReview={handleReview}
            handleView={handleView}
            record={record}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
         />
      ),
   },
];

export const columnsProduct2 = [
   // {
   //    name: 'ID',
   //    selector: (row: any) => row.id,
   //
   // },
   {
      name: 'Name',
      selector: (row: any) => row.name,
   },
   {
      name: 'Username',
      selector: (row: any) => row.username,
   },
   {
      name: 'Email',
      selector: (row: any) => row.email,
   },
];

export const columnsCustomer = ({
   handleView = (record: any) => {},
   handleEditClick = (record: any) => {},
   handleDelete = (record: any) => {},
}) => [
   {
      name: 'UserId',
      selector: (row: any) => row.userId,
   },
   {
      name: 'Address',
      selector: (row: any) => row.address,
   },
   {
      name: 'Phone',
      selector: (row: any) => row.phone,
   },
   {
      name: 'Birthday',
      selector: (row: any) => row.dateOfBirth,
   },
   {
      name: 'Gender',
      selector: (row: any) => row.gender,
      width: '120px',
   },
   {
      name: 'avatar',
      selector: (row: any) => row.avatar,
      minWidth: '100px',
   },
   {
      name: 'Action',
      center: true,
      minWidth: '100px',
      cell: (record: any) => (
         <TableActions
            handleView={handleView}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            record={record}
         />
      ),
   },
];

export const columnsUserDetail = ({
   handleView = (record: any) => {},
   handleEditClick = (record: any) => {},
   handleDelete = (record: any) => {},
}: {
   handleView?: (record: any) => void;
   handleEditClick?: (record: any) => void;
   handleDelete?: (record: any) => void;
}) => [
   // {
   //    name: 'UserId',
   //    selector: (row: any) => row.userId,
   //
   // },
   {
      name: 'Address',
      selector: (row: any) => row.address,
   },
   {
      name: 'Phone',
      selector: (row: any) => row.phone,
      minWidth: '150px',
      maxWidth: '200px',
   },
   {
      name: 'Birthday',
      selector: (row: any) => row.dateOfBirth,
   },
   {
      name: 'Gender',
      selector: (row: any) => row.gender,
      width: '100px',
   },
   {
      name: 'Avatar',
      selector: (row: any) => row.avatar,
   },
   {
      name: 'Action',
      center: true,
      minWidth: '100px',
      cell: (record: any) => (
         <TableActions
            handleView={handleView}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            record={record}
         />
      ),
   },
];

export const columnsMainDash = ({
   handleView = (record: any) => {},
   handleEditClick = (record: any) => {},
   handleDeactivate = (record: any) => {},
   handleActivate = (record: any) => {},
}: {
   handleView?: (record: any) => void;
   handleEditClick?: (record: any) => void;
   handleDeactivate?: (record: any) => void;
   handleActivate?: (record: any) => void;
}) => [
   // {
   //    name: 'ID',
   //    selector: (row: any) => row.id,
   //
   // },
   {
      name: 'Name',
      selector: (row: any) => row.name,
   },
   {
      name: 'UserName',
      selector: (row: any) => row.username,
   },
   {
      name: 'Email',
      selector: (row: any) => row.email,
   },
   {
      name: 'Role',
      selector: (row: any) => row.role,
      width: '70px',
   },
   {
      name: 'Active',
      selector: (row: any) => row.isActive,
      center: true,
      cell: (row: any) => {
         const isActive =
            typeof row.isActive === 'string'
               ? row.isActive === 'true'
               : !!row.isActive;

         return (
            <StatusStyle isActive={isActive}>
               {isActive ? 'Active' : 'Deactive'}
            </StatusStyle>
         );
      },
   },
   {
      name: 'Actions',
      center: true,
      minWidth: '100px',

      cell: (record: any) => (
         <TableActions
            handleView={handleView}
            handleEditClick={handleEditClick}
            handleDeactivate={handleDeactivate}
            handleActivate={handleActivate}
            record={record}
         />
      ),
   },
];

export const columnsOrder = ({
   handleView = (record: any) => {},
   handleEditClick = (record: any) => {},
   handleDelete = (record: any) => {},
   handleReview = (record: any) => {},
}: {
   handleView?: (record: any) => void;
   handleEditClick?: (record: any) => void;
   handleDelete?: (record: any) => void;
   handleReview?: (record: any) => void;
}) => [
   {
      name: 'ID',
      selector: (row: any) => row.id,
   },
   {
      name: 'Total Products',
      selector: (row: any) => row.totalProducts,
   },
   {
      name: 'Total Quantity',
      selector: (row: any) => row.totalQuantity,
   },

   {
      name: 'Discounted Total',
      selector: (row: any) => row.discountedTotal,
   },
   {
      name: 'Total',
      selector: (row: any) => row.total,
   },
   {
      name: 'Status',
      selector: (row: any) => row.status,
      width: '140px',
      center: true,
      cell: (row: any) => {
         const status = row.status.toLowerCase();

         let color;
         switch (status) {
            case 'pending':
               color = 'var(--color-orange)';
               break;
            case 'shipped':
               color = '#00CED1';
               break;
            case 'delivered':
               color = '#32CD32';
               break;
            case 'cancelled':
               color = '#FF4242';
               break;
            default:
               color = '#ccc';
               break;
         }
         return <ExampleComponent color={color} status={status} />;
      },
   },
   {
      name: 'Customer Id',
      selector: (row: any) => row.customerId,
   },

   {
      name: 'Action',
      center: true,
      minWidth: '100px',
      cell: (record: any) => (
         <TableActions
            handleView={handleView}
            // handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            handleReview={handleReview}
            record={record}
         />
      ),
   },
];
