import React from "react";

import Table from "../../components/Table/Table";
import "./Orders.css";

function Orders() {
   const columns = [
      {
         name: "Fullname",
         selector: (row) => row.fullname,
         sortable: true,
      },
      {
         name: "Action",
         cell: (row) => <button className="btn btn-primary">Edit</button>,
      },
   ];

   const data = [
      {
         id: 1,
         fullname: "Box 1",
      },
      {
         id: 2,
         fullname: "Box 2",
      },
      {
         id: 3,
         fullname: "Box 3",
      },
      {
         id: 4,
         fullname: "Box 4",
      },
      {
         id: 5,
         fullname: "Box 5",
      },
      {
         id: 6,
         fullname: "Box 6",
      },
      {
         id: 7,
         fullname: "Box 7",
      },
      {
         id: 8,
         fullname: "Box 8",
      },
      {
         id: 9,
         fullname: "Box 9",
      },
      {
         id: 10,
         fullname: "Box 10",
      },
      {
         id: 11,
         fullname: "Box 11",
      },
      {
         id: 12,
         fullname: "Box 12",
      },
      {
         id: 13,
         fullname: "Box 13",
      },
      {
         id: 14,
         fullname: "Box 14",
      },
      {
         id: 15,
         fullname: "Box 15",
      },
      {
         id: 16,
         fullname: "Box 16",
      },
   ];
   return (
      <div className="Orders">
         <Table columns={columns} data={data} />
      </div>
   );
}

export default Orders;
