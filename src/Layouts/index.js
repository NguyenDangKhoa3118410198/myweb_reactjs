import RightSide from "../components/RigtSide/RightSide";
import Sidebar from "../components/LeftSide/Sidebar";
function AdminDefaultLayout({ children }) {
   return (
      <>
         <Sidebar />
         {children}
         <RightSide />
      </>
   );
}

export default AdminDefaultLayout;
