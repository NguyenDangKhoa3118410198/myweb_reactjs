import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import './mainDash.css';

function FormPanel({
   title,
   handleSubmit,
   formData,
   setFormData,
   handleClose,
}) {
   return (
      <div className='form-panel-container'>
         <div className='form-panel'>
            <p className='title-panel'>{title}</p>
            <Form onSubmit={handleSubmit} className='form-container'>
               <FormGroup className='form-control-input'>
                  <FormControl
                     type='text'
                     placeholder='Họ tên'
                     name='name'
                     value={formData.name}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           name: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <FormGroup className='form-control-input'>
                  <FormControl
                     type='text'
                     placeholder='Tên đăng nhập'
                     name='username'
                     value={formData.username}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           username: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <FormGroup className='form-control-input'>
                  <FormControl
                     type='email'
                     placeholder='Email'
                     name='email'
                     value={formData.email}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           email: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <div className='button-group-form-panel'>
                  <Button className='form-control-btn' type='submit'>
                     {title}
                  </Button>
                  <Button
                     className='form-control-btn'
                     type='cancel'
                     onClick={handleClose}
                  >
                     Cancel
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
}

export default FormPanel;
