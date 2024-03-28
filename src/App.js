import React, { lazy, Suspense } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';

// Import các component cần lazy load
const LazyAdminDefaultLayout = lazy(() => import('./Layouts/DefaultLayout'));

function App() {
   const renderComponentAndLayout = (route) => {
      const PageCurrent = route.component || Fragment;
      const Layout = route.layout || LazyAdminDefaultLayout; // Sử dụng LazyAdminDefaultLayout
      return { PageCurrent, Layout };
   };

   return (
      <Router>
         <div className='App'>
            <Suspense fallback={<div>Loading...</div>}>
               <Routes>
                  {publicRoutes.map((route) => {
                     const { PageCurrent, Layout } =
                        renderComponentAndLayout(route);

                     return (
                        <Route
                           key={route.name}
                           path={route.path}
                           element={
                              <Layout name={route.name}>
                                 <PageCurrent />
                              </Layout>
                           }
                        />
                     );
                  })}

                  {privateRoutes.map((route) => {
                     const { PageCurrent, Layout } =
                        renderComponentAndLayout(route);

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
            </Suspense>
         </div>
      </Router>
   );
}

export default App;
