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
                     className='form-panel-input'
                     type='text'
                     placeholder='Address'
                     name='address'
                     value={formData.address}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           address: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>
               <FormGroup className='form-control-input'>
                  <FormControl
                     className='form-panel-input'
                     type='text'
                     placeholder='Phone'
                     name='phone'
                     value={formData.phone}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           phone: e.target.value,
                        });
                     }}
                     required
                  />
               </FormGroup>

               <FormGroup className='form-control-input'>
                  <Form.Select
                     aria-label='Gender'
                     className='form-panel-input-select'
                     value={formData.gender}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           gender: e.target.value,
                        });
                     }}
                  >
                     <option value='Male'>Male</option>
                     <option value='Female'>Female</option>
                  </Form.Select>
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
