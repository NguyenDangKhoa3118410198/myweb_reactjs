import React from "react";
import Cards from "../../components/Cards/Cards";
import Table from "../../components/Table/Table";
import "./MainDash.css";

const MainDash = () => {
   return (
      <div className="MainDash">
         <Cards />
         <Table />
      </div>
   );
};

export default MainDash;
