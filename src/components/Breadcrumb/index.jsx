import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './custom-breadcrumb.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

function BreadcrumbExample() {
   return (
      <Breadcrumb>
         <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
         <Breadcrumb.Item href='/products'>Products</Breadcrumb.Item>
         <Breadcrumb.Item href='/orders'>Orders</Breadcrumb.Item>
      </Breadcrumb>
   );
}

export default BreadcrumbExample;
