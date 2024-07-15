import MainDash from '../pages/MainDash/MainDash';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import UsersDetail from '../pages/UsersDetail';
import Products from '../pages/Products';
import Analytics from '../pages/Analytics';
import AdminLogin from '../components/AdminLogin';
import VideoPlayer from '../pages/VideoPlayer';

import NullLayout from '../Layouts/NullLayout';
import AdminDefaultLayout from '../Layouts/DefaultLayout';
import NotFoundComponent from '../Layouts/NotFoundComponent';
import Contact from '../pages/Contact/Contact';
import InfoWeb from '../pages/InfoWeb';
import Profile from '../pages/Profile';
import ForgotPassword from '../components/ForgotPass/ForgotPassword';
import NewPassword from '../components/ForgotPass/NewPassword';
import Setting from '../pages/Setting';
import { IRoute } from '../App';

const publicRoutes: IRoute[] = [
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
   {
      name: 'Forgot Password',
      path: '/forgot-password',
      component: ForgotPassword,
      layout: NullLayout,
   },
   {
      name: 'New Password',
      path: '/new-password',
      component: NewPassword,
      layout: NullLayout,
   },
];

const privateRoutes: IRoute[] = [
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
      name: 'Users Detail',
      path: '/usersDetail',
      component: UsersDetail,
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
   {
      name: 'Profile',
      path: '/profile',
      component: Profile,
      layout: NullLayout,
   },
   {
      name: 'Setting',
      path: '/setting',
      component: Setting,
      layout: NullLayout,
   },
   {
      name: 'Info',
      path: '/info',
      component: InfoWeb,
      layout: NullLayout,
   },
];

export { publicRoutes, privateRoutes };
