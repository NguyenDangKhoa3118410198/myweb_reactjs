import "./App.css";
import { publicRoutes } from "./routes";
import AdminDefaultLayout from "./Layouts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const PageCurrent = route.component;
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
                           <div className="AppGlass">
                              <Layout>
                                 <PageCurrent />
                              </Layout>
                           </div>
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
