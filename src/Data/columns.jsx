import TableActions from '../components/Table/TableActions/TableActions';

export const columnsProduct1 = [
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
];

export const columnsProduct = [
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

export const columnsCustomer = (handleEditClick, handleDelete) => [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: 'First name',
      selector: (row) => row.firstName,
      sortable: true,
   },
   {
      name: 'Last name',
      selector: (row) => row.lastName,
      sortable: true,
   },
   {
      name: 'Maiden Name',
      selector: (row) => row.maidenName,
      sortable: true,
   },
   {
      name: 'Age',
      selector: (row) => row.age,
      sortable: true,
   },
   {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
   },
   {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
   },
   {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
      cell: (record) => TableActions(handleEditClick, handleDelete, record),
   },
];

export const columnsMainDash = (handleView, handleEditClick, handleDelete) => [
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
      name: 'Action',
      sortable: false,
      cell: (record) =>
         TableActions(handleView, handleEditClick, handleDelete, record),
   },
];

export const columnsOrder = (handleEditClick, handleDelete) => [
   {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
   },
   {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
   },
   {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
   },
   {
      name: 'Total',
      selector: (row) => row.total,
      sortable: true,
   },
   {
      name: 'Action',
      sortable: false,
      cell: (record) => TableActions(handleEditClick, handleDelete, record),
   },
];
