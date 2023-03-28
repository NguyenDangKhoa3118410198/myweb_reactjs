import React, { useState, useEffect } from "react";
import { UilMultiply } from "@iconscout/react-unicons";

import Modal from "react-modal";
import "./CrudModal.css";

const CrudModal = ({
   isOpen,
   onRequestClose,
   onSave,
   onDelete,
   record,
   shouldCloseOnOverlayClick,
}) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
   });

   useEffect(() => {
      if (record) {
         setFormData({ name: record.name, email: record.email });
      } else {
         setFormData({ name: "", email: "" });
      }
   }, [record]);

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSaveClick = () => {
      onSave({ ...record, ...formData });
      onRequestClose();
   };

   const handleDeleteClick = () => {
      onDelete(record.id);
      onRequestClose();
   };

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
         ariaHideApp={false}
         style={{
            overlay: {
               position: "fixed",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
               position: "absolute",
               width: "30rem",
               height: "32rem",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               border: "1px solid #ccc",
               background: "#fff",
               overflow: "auto",
               WebkitOverflowScrolling: "touch",
               borderRadius: "4px",
               outline: "none",
               padding: "20px",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
            },
         }}
      >
         <h2>{record ? "Edit" : "Add"}</h2>
         <form>
            <button
               type="button"
               className="close-form"
               onClick={onRequestClose}
            >
               <UilMultiply />
            </button>
            <div>
               <label htmlFor="name">Name:</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
               />
            </div>
            <div>
               <label htmlFor="email">Email:</label>
               <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
               />
            </div>
         </form>
         <div className="group-button">
            <button
               type="submit"
               className="submit-button"
               onClick={handleSaveClick}
            >
               Save
            </button>
            {record && (
               <button
                  type="cancel"
                  className="cancel-button"
                  onClick={handleDeleteClick}
               >
                  Cancel
               </button>
            )}
         </div>
      </Modal>
   );
};

export default CrudModal;
