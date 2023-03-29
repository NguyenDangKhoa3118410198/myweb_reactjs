import React from "react";

const ActionsCell = ({
   record,
   handleEditClick,
   handleAddClick,
   handleDelete,
}) => {
   return (
      <div>
         <button
            className="btn btn-primary btn-spacing"
            onClick={() => handleEditClick(record)}
         >
            Edit
         </button>

         <button
            className="btn btn-danger btn-spacing"
            onClick={() => handleDelete(record)}
         >
            Delete
         </button>
      </div>
   );
};

export default ActionsCell;
