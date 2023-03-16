import MainDash from "../components/MainDash/MainDash";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Analytics from "../pages/Analytics";

const publicRoutes = [
   {
      path: "/",
      component: MainDash,
   },
   {
      path: "/orders",
      component: Orders,
   },
   {
      path: "/customers",
      component: Customers,
   },
   {
      path: "/products",
      component: Products,
   },
   {
      path: "/analytics",
      component: Analytics,
   },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
