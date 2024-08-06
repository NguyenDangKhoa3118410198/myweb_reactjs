import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../MainDash/mainDash.css';

interface FormData {
   address: string;
   phone: string;
   gender: string;
}

interface FormPanelProps {
   title: string;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   formData: FormData;
   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
   handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormPanel: React.FC<FormPanelProps> = ({
   title,
   handleSubmit,
   formData,
   setFormData,
   handleClose,
}) => {
   return (
      <div className='form-panel-container'>
         <div className='form-panel'>
            <p className='title-panel'>{title}</p>
            <Form onSubmit={handleSubmit} className='form-container'>
               <FormGroup
                  controlId='formAddress'
                  className='form-control-input'
               >
                  <Form.Label className='no-margin-label'>Address</Form.Label>
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
               <FormGroup controlId='formPhone' className='form-control-input'>
                  <Form.Label className='no-margin-label'>Phone</Form.Label>
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
                  <Form.Label className='no-margin-label'>Gender</Form.Label>
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
                     type='button' // Đổi từ 'cancel' thành 'button' vì 'cancel' không phải là giá trị hợp lệ cho thuộc tính 'type'
                     onClick={handleClose}
                  >
                     Cancel
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default FormPanel;
