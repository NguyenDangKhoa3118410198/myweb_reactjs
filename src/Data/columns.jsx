import TableActions from '../components/Table/TableActions/TableActions';

export const columnsProduct1 = ({
   handleView,
   handleEditClick,
   handleDelete,
   handleReview,
}) => [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '100px',
   },
   {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      maxWidth: '250px',
   },
   {
      name: 'Url path',
      selector: (row) => row.urlPath,
      sortable: true,
      maxWidth: '250px',
   },
   {
      name: 'Origin price',
      selector: (row) => row.originPrice,
      sortable: true,
      center: true,
   },
   {
      name: 'Action',
      sortable: false,
      maxWidth: 'max-content',
      cell: (record) => (
         <TableActions handleReview={handleReview} record={record} />
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
      maxWidth: 'max-content',
      cell: (record) => (
         <TableActions
            handleView={handleView}
            // handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            record={record}
         />
      ),
   },
];

export const columnsMainDash = ({
   handleView,
   handleEditClick,
   handleDelete,
}) => [
   // {
   //    name: 'ID',
   //    selector: (row) => row.id,
   //    sortable: true,
   // },
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
      name: 'Active',
      selector: (row) => row.isActive,
      sortable: true,
   },
   {
      name: 'Actions',
      sortable: false,
      maxWidth: 'max-content',
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
   },
   {
      name: 'CustomerId',
      selector: (row) => row.customerId,
      sortable: true,
   },

   {
      name: 'Action',
      sortable: false,
      maxWidth: 'max-content',
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
