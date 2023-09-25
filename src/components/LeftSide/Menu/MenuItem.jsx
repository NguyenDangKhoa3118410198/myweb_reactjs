import { NavLink } from "react-router-dom";
import "./menu.css";

function MenuItem({ title, to, icon, className }) {
   return (
      <NavLink className={className} to={to}>
         <span className="icon">{icon}</span>
         <span className="item">{title}</span>
      </NavLink>
   );
}
export default MenuItem;
