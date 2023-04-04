import Sidebar from "../../components/LeftSide/Sidebar";
import Header from "../../components/Header/Header";
import "./AdminDefaultLayout.css";

function AdminDefaultLayout({ name, children }) {
   return (
      <div className="AppGlass">
         <Sidebar />
         <div className="container">
            <Header nameContent={name} />
            {children}
         </div>
      </div>
   );
}

export default AdminDefaultLayout;
