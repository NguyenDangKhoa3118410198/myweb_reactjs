import TableActions from '../components/Table/TableActions/TableActions';
import styled from 'styled-components';

const StatusStyle = styled.div`
   min-width: 30%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
   padding: 5px 15px;
   color: #fff;
   border-radius: 20px;
   background-color: ${(props) => (props.isActive ? '#6adb89' : '#FF4242')};
`;

export const columnsProduct1 = ({
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
}) => [
   // {
   //    name: 'ID',
   //    selector: (row) => row.id,
   //    sortable: true,
   //    maxWidth: '100px',
   // },
   {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      maxWidth: '250px',
   },
   {
      name: 'Brand',
      selector: (row) => row.brandName,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Url path',
      selector: (row) => row.urlPath,
      sortable: true,
      maxWidth: '300px',
   },
   {
      name: 'Origin price',
      selector: (row) => row.originPrice,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
      center: true,
      maxWidth: '150px',
   },
   {
      name: 'Action',
      sortable: false,
      center: true,
      minWidth: '100px',
      cell: (record) => (
         <TableActions
            handleReview={handleReview}
            handleView={handleView}
            record={record}
         />
      ),
   },
];

export const columnsProduct2 = [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
   },
   {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
   },
   {
      name: 'Email',
      selector: (row) => row.email,
      sortable: false,
   },
];

export const columnsCustomer = ({
   handleView,
   handleEditClick,
   handleDelete,
}) => [
   {
      name: 'UserId',
      selector: (row) => row.userId,
      sortable: true,
   },
   {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
   },
   {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
   },
   {
      name: 'dateOfBirth',
      selector: (row) => row.dateOfBirth,
      sortable: true,
   },
   {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
   },
   {
      name: 'avatar',
      selector: (row) => row.avatar,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
      center: true,
      minWidth: '100px',
      cell: (record) => (
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
   handleView,
   handleEditClick,
   handleDelete,
}) => [
   {
      name: 'UserId',
      selector: (row) => row.userId,
      sortable: true,
   },
   {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
   },
   {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
      minWidth: '150px',
      maxWidth: '200px',
   },
   {
      name: 'dateOfBirth',
      selector: (row) => row.dateOfBirth,
      sortable: true,
   },
   {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
      minWidth: '80px',
      maxWidth: '120px',
   },
   {
      name: 'avatar',
      selector: (row) => row.avatar,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
      center: true,
      minWidth: '100px',
      cell: (record) => (
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
   handleView,
   handleEditClick,
   handleDeactivate,
   handleActivate,
}) => [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
   },
   {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
   },
   {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
   },
   {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
   },
   {
      name: 'Active',
      selector: (row) => row.isActive,
      sortable: true,
      center: true,
      cell: (row) => {
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

      cell: (record) => (
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
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
}) => [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: 'TotalProducts',
      selector: (row) => row.totalProducts,
      sortable: true,
   },
   {
      name: 'TotalQuantity',
      selector: (row) => row.totalQuantity,
      sortable: true,
   },

   {
      name: 'DiscountedTotal',
      selector: (row) => row.discountedTotal,
      sortable: true,
   },
   {
      name: 'Total',
      selector: (row) => row.total,
      sortable: true,
   },
   {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      center: true,
      cell: (row) => {
         const status = row.status.toLowerCase();

         let backgroundColor;
         switch (status) {
            case 'pending':
               backgroundColor = 'rgb(255 229 65)';
               break;
            case 'shipped':
               backgroundColor = '#00CED1';
               break;
            case 'delivered':
               backgroundColor = '#32CD32';
               break;
            case 'cancelled':
               backgroundColor = '#FF4242';
               break;
            default:
               backgroundColor = '#ccc';
               break;
         }
         return (
            <StatusStyle
               style={{ backgroundColor: backgroundColor, fontWeight: 600 }}
            >
               {status}
            </StatusStyle>
         );
      },
   },
   {
      name: 'CustomerId',
      selector: (row) => row.customerId,
      sortable: true,
   },

   {
      name: 'Action',
      sortable: false,
      center: true,
      minWidth: '100px',
      cell: (record) => (
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
