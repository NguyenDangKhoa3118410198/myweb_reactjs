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
      sortable: true,
      maxWidth: '250px',
   },
   {
      name: 'Brand',
      selector: (row: any) => row.brandName,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Category',
      selector: (row: any) => row.category,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Url path',
      selector: (row: any) => row.urlPath,
      sortable: true,
      maxWidth: '300px',
   },
   {
      name: 'Origin price',
      selector: (row: any) => row.originPrice,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Price',
      selector: (row: any) => row.price,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Action',
      sortable: false,
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
   {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
   },
   {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
   },
   {
      name: 'Username',
      selector: (row: any) => row.username,
      sortable: true,
   },
   {
      name: 'Email',
      selector: (row: any) => row.email,
      sortable: false,
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
      sortable: true,
   },
   {
      name: 'Address',
      selector: (row: any) => row.address,
      sortable: true,
   },
   {
      name: 'Phone',
      selector: (row: any) => row.phone,
      sortable: true,
   },
   {
      name: 'dateOfBirth',
      selector: (row: any) => row.dateOfBirth,
      sortable: true,
   },
   {
      name: 'Gender',
      selector: (row: any) => row.gender,
      sortable: true,
   },
   {
      name: 'avatar',
      selector: (row: any) => row.avatar,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
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
   {
      name: 'UserId',
      selector: (row: any) => row.userId,
      sortable: true,
   },
   {
      name: 'Address',
      selector: (row: any) => row.address,
      sortable: true,
   },
   {
      name: 'Phone',
      selector: (row: any) => row.phone,
      sortable: true,
      minWidth: '150px',
      maxWidth: '200px',
   },
   {
      name: 'dateOfBirth',
      selector: (row: any) => row.dateOfBirth,
      sortable: true,
   },
   {
      name: 'Gender',
      selector: (row: any) => row.gender,
      sortable: true,
      minWidth: '80px',
      maxWidth: '120px',
   },
   {
      name: 'avatar',
      selector: (row: any) => row.avatar,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
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
   {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
   },
   {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
   },
   {
      name: 'Username',
      selector: (row: any) => row.username,
      sortable: true,
   },
   {
      name: 'Email',
      selector: (row: any) => row.email,
      sortable: true,
   },
   {
      name: 'Role',
      selector: (row: any) => row.role,
      sortable: true,
   },
   {
      name: 'Active',
      selector: (row: any) => row.isActive,
      sortable: true,
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
      sortable: false,
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
      sortable: true,
   },
   {
      name: 'TotalProducts',
      selector: (row: any) => row.totalProducts,
      sortable: true,
   },
   {
      name: 'TotalQuantity',
      selector: (row: any) => row.totalQuantity,
      sortable: true,
   },

   {
      name: 'DiscountedTotal',
      selector: (row: any) => row.discountedTotal,
      sortable: true,
   },
   {
      name: 'Total',
      selector: (row: any) => row.total,
      sortable: true,
   },
   {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
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
      name: 'CustomerId',
      selector: (row: any) => row.customerId,
      sortable: true,
   },

   {
      name: 'Action',
      sortable: false,
      center: true,
      minWidth: '100px',
      cell: (record: any) => (
         <TableActions
            handleView={handleView}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            handleReview={handleReview}
            record={record}
         />
      ),
   },
];
