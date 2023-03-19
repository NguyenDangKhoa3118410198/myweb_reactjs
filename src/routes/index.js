import MainDash from "../pages/MainDash/MainDash";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Analytics from "../pages/Analytics";
import AdminDefaultLayout from "../Layouts/DefaultLayout";

const publicRoutes = [
   {
      name: "Dashboard",
      path: "/",
      component: MainDash,
      layout: AdminDefaultLayout,
   },
   {
      name: "Orders",
      path: "/orders",
      component: Orders,
   },
   {
      name: "Customer",
      path: "/customers",
      component: Customers,
   },
   {
      name: "Products",
      path: "/products",
      component: Products,
   },
   {
      name: "Analytics",
      path: "/analytics",
      component: Analytics,
   },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
