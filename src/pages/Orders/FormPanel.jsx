import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../MainDash/mainDash.css';

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
                     placeholder='Title'
                     name='title'
                     value={formData.title}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           title: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <FormGroup className='form-control-input'>
                  <FormControl
                     type='number'
                     min='1'
                     placeholder='Amount'
                     name='amount'
                     value={formData.amount}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           amount: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <FormGroup className='form-control-input'>
                  <FormControl
                     type='number'
                     min='1'
                     placeholder='Price'
                     name='price'
                     value={formData.price}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           price: e.target.value,
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
