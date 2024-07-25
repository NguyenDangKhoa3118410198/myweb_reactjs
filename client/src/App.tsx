import React, { lazy, Suspense, Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';
import Loading from './components/Loading';

const LazyAdminDefaultLayout = lazy(() => import('./Layouts/DefaultLayout'));

export interface IRoute {
   name: string;
   path: string;
   component?: React.ComponentType<any> | null;
   layout?: React.ComponentType<any>;
}

function App() {
   const renderComponentAndLayout = (route: IRoute) => {
      const PageCurrent = route.component || Fragment;
      const Layout = route.layout || LazyAdminDefaultLayout;
      return { PageCurrent, Layout };
   };

   return (
      <Router>
         <div className='App'>
            <Suspense fallback={<Loading />}>
               <Routes>
                  {publicRoutes.map((route: IRoute) => {
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

                  {privateRoutes.map((route: IRoute) => {
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
