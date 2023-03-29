import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../components/Table/Table";
import "./MainDash.css";
import CrudModal from "../../components/ReactModal/CrudModal";
import ActionsCell from "../../components/ReactModal/ActionsCell/ActionsCell";

const MainDash = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [records, setRecords] = useState([]);
   const [currentRecord, setCurrentRecord] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");

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
         sortable: false,
         cell: (record) => (
            <ActionsCell
               record={record}
               handleEditClick={handleEditClick}
               handleAddClick={handleAddClick}
               handleDelete={handleDelete}
            />
         ),
      },
   ];

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
            setRecords(updatedData);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const handleAddClick = () => {
      setCurrentRecord(null);
      setIsModalOpen(true);
   };

   const handleEditClick = (record) => {
      setCurrentRecord(record);
      setIsModalOpen(true);
   };

   const handleSave = (record) => {
      if (record.id) {
         // Update existing record
         setRecords(
            records.map((r) => (r.id === record.id ? { ...r, ...record } : r))
         );
      } else {
         // Add new record
         const newRecord = { ...record, id: Date.now() };
         setRecords([...records, newRecord]);
      }
   };

   const handleDelete = (record) => {
      if (records.length === 0) {
         console.log("No records to delete");
         return;
      }
      setRecords(records.filter((r) => r.id !== record.id));
   };

   function handleSearch(event) {
      setSearchTerm(event.target.value);
   }

   function filterData(records) {
      return records.filter((row) =>
         Object.values(row).some(
            (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(searchTerm.toLowerCase())
         )
      );
   }

   return (
      <div className="MainDash">
         <div className="add-filter-wrapper">
            <button
               className="btn btn-success btn-add"
               onClick={() => handleAddClick()}
            >
               Add
            </button>
            <input
               className="searchBox"
               type="text"
               placeholder="Search..."
               value={searchTerm}
               onChange={handleSearch}
            />
         </div>
         <CrudModal
            record={currentRecord}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            onSave={handleSave}
            onDelete={handleDelete}
         />

         <Table columns={columns} data={filterData(records)} />
      </div>
   );
};

export default MainDash;
