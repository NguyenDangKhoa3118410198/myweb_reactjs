import React, { useState, useEffect } from "react";
import axios from "axios";

// import Cards from "../../components/Cards/Cards";
import Table from "../../components/Table/Table";
import "./MainDash.css";

// const columns = [
//    {
//       name: "ID",
//       selector: (row) => row.year,
//       sortable: true,
//    },
//    {
//       name: "Fullname",
//       selector: (row) => row.fullname,
//       sortable: true,
//    },
//    {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//    },
//    {
//       name: "Action",
//       cell: (row) => (
//          <button
//             className="btn btn-primary"
//             onClick={() => handleButtonClick(row)}
//          >
//             Edit
//          </button>
//       ),
//    },
// ];

// const data = [
//    {
//       id: 1,
//       fullname: "John Mask",
//       year: "18",
//       email: "john20@gmail.com",
//    },
//    {
//       id: 2,
//       fullname: "Ben Wilson",
//       year: "20",
//       email: "ben10@gmail.com",
//    },
//    {
//       id: 3,
//       fullname: "Aquarus Lupin",
//       year: "8",
//       email: "pokin20@gmail.com",
//    },
//    {
//       id: 4,
//       fullname: "Will Franch",
//       year: "50",
//       email: "oldman@gmail.com",
//    },
//    {
//       id: 5,
//       fullname: "John Mask",
//       year: "18",
//       email: "john20@gmail.com",
//    },
// ];

const columns = [
   {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
   },
   {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
   },
   {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
   },
   {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
   },
   {
      name: "Action",
      cell: (row) => (
         <button
            className="btn btn-primary"
            onClick={() => handleButtonClick(row)}
         >
            Edit
         </button>
      ),
   },
];

const handleButtonClick = (row) => {
   console.log(row);
};

const MainDash = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      axios
         .get("https://jsonplaceholder.typicode.com/users")
         .then((response) => {
            const updatedData = response.data.map((user) => {
               return {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  email: user.email,
               };
            });
            setData(updatedData);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <div className="MainDash">
         <Table columns={columns} data={data} />
      </div>
   );
};

export default MainDash;
