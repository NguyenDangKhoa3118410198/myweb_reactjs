import MainDash from '../pages/MainDash/MainDash';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import Analytics from '../pages/Analytics';
import AdminLogin from '../components/AdminLogin';
import VideoPlayer from '../pages/VideoPlayer';

import NullLayout from '../Layouts/NullLayout';
import AdminDefaultLayout from '../Layouts/DefaultLayout';
import NotFoundComponent from '../Layouts/NotFoundComponent';
import Contact from '../pages/Contact/Contact';

const publicRoutes = [
   {
      name: 'Admin Login',
      path: '/login',
      component: AdminLogin,
      layout: NullLayout,
   },
   {
      name: 'Error 404',
      path: '*',
      component: null,
      layout: NotFoundComponent,
   },
];

const privateRoutes = [
   {
      name: 'Dashboard',
      path: '/',
      component: MainDash,
      layout: AdminDefaultLayout,
   },
   {
      name: 'Dashboard',
      path: '/home',
      component: MainDash,
      layout: AdminDefaultLayout,
   },
   {
      name: 'Orders',
      path: '/orders',
      component: Orders,
   },
   {
      name: 'Customer',
      path: '/customers',
      component: Customers,
   },
   {
      name: 'Products',
      path: '/products',
      component: Products,
   },
   {
      name: 'Analytics',
      path: '/analytics',
      component: Analytics,
   },
   {
      name: 'Video',
      path: '/video',
      component: VideoPlayer,
   },
   {
      name: 'Contact',
      path: '/contact',
      component: Contact,
      layout: NullLayout,
   },
];

export { publicRoutes, privateRoutes };
