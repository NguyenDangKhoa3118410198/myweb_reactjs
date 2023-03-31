import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";
import AdminDefaultLayout from "./Layouts/DefaultLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";

function App() {
   const handleRouteComponentAndLayout = (route) => {
      const PageCurrent = route.component || Fragment;
      const Layout = route.layout || AdminDefaultLayout;
      return { PageCurrent, Layout };
   };

   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route) => {
                  const { PageCurrent, Layout } =
                     handleRouteComponentAndLayout(route);

                  return (
                     <Route
                        key={route.name}
                        path={route.path}
                        element={
                           //trong JSX ten cua element phai duoc viet Hoa len
                           <Layout name={route.name}>
                              <PageCurrent />
                           </Layout>
                        }
                     />
                  );
               })}

               {privateRoutes.map((route) => {
                  const { PageCurrent, Layout } =
                     handleRouteComponentAndLayout(route);

                  return (
                     <Route
                        key={route.name}
                        path={route.path}
                        element={
                           <PrivateRoute>
                              <Layout name={route.name}>
                                 <PageCurrent />
                              </Layout>
                           </PrivateRoute>
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
