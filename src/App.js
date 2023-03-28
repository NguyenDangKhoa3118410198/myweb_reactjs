import "./App.css";
import { publicRoutes } from "./routes";
import AdminDefaultLayout from "./Layouts/DefaultLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  let PageCurrent = route.component;
                  if (route.component) {
                     PageCurrent = route.component;
                  } else if (route.component === null) {
                     PageCurrent = Fragment;
                  }

                  let Layout = AdminDefaultLayout;
                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
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
            </Routes>
         </div>
      </Router>
   );
}

export default App;
