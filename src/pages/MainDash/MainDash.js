import React from "react";
// import Cards from "../../components/Cards/Cards";
import Table from "../../components/Table/Table";
import "./MainDash.css";

const columns = [
   {
      id: "fullname",
      name: "Fullname",
      selector: (row) => row.fullname,
      sortable: true,
   },
   {
      id: "age",
      name: "Age",
      selector: (row) => row.year,
      sortable: true,
   },
   {
      id: "email",
      name: "Email",
      selector: (row) => row.email,
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
      fullname: "John Mask",
      year: "18",
      email: "john20@gmail.com",
   },
   {
      id: 2,
      fullname: "Ben Wilson",
      year: "20",
      email: "ben10@gmail.com",
   },
   {
      id: 3,
      fullname: "Aquarus Lupin",
      year: "8",
      email: "pokin20@gmail.com",
   },
   {
      id: 4,
      fullname: "Will Franch",
      year: "50",
      email: "oldman@gmail.com",
   },
   {
      id: 5,
      fullname: "John Mask",
      year: "18",
      email: "john20@gmail.com",
   },
   {
      id: 6,
      fullname: "Ben Wilson",
      year: "20",
      email: "ben10@gmail.com",
   },
   {
      id: 7,
      fullname: " Lupin d",
      year: "8",
      email: "pokin20@gmail.com",
   },
   {
      id: 8,
      fullname: " Franch c",
      year: "50",
      email: "oldman@gmail.com",
   },
   {
      id: 9,
      fullname: " Lupin b",
      year: "8",
      email: "pokin20@gmail.com",
   },
   {
      id: 10,
      fullname: "Will a",
      year: "50",
      email: "oldman@gmail.com",
   },
];

const MainDash = () => {
   return (
      <div className="MainDash">
         <Table columns={columns} data={data} />
      </div>
   );
};

export default MainDash;
