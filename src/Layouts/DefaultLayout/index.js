import Sidebar from "../../components/LeftSide/Sidebar";
import Header from "../../components/Header/Header";
import "./AdminDefaultLayout.css";

function AdminDefaultLayout({ name, children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout-container">
        <Header nameContent={name} />
        {children}
      </div>
    </div>
  );
}

export default AdminDefaultLayout;
