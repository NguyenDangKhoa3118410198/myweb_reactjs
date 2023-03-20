// import RightSide from "../../components/RightSide/RightSide";
import Sidebar from "../../components/LeftSide/Sidebar";
import Header from "../../components/Header/Header";
import "./AdminDefaultLayout.css";

function AdminDefaultLayout({ name, children }) {
   return (
      <>
         <Sidebar />
         <div className="content">
            <Header nameContent={name} />
            {children}
         </div>
      </>
   );
}

export default AdminDefaultLayout;
