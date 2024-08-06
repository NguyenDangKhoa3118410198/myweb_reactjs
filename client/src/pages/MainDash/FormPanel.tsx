import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import './mainDash.css';

interface FormData {
   name: string;
   username: string;
   email: string;
}

interface FormPanelProps {
   title: string;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   formData: FormData;
   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
   handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
   targetRef?: React.RefObject<HTMLDivElement>; // optional
}

const FormPanel: React.FC<FormPanelProps> = ({
   title,
   handleSubmit,
   formData,
   setFormData,
   handleClose,
   targetRef,
}) => {
   return (
      <div className='form-panel-container' ref={targetRef}>
         <div className='form-panel'>
            <p className='title-panel'>{title}</p>
            <Form onSubmit={handleSubmit} className='form-container'>
               <FormGroup controlId='formName' className='form-control-input'>
                  <Form.Label className='no-margin-label'>Name</Form.Label>
                  <FormControl
                     className='form-panel-input'
                     type='text'
                     placeholder='Name'
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
               <FormGroup
                  controlId='formUsername'
                  className='form-control-input'
               >
                  <Form.Label className='no-margin-label'>Username</Form.Label>
                  <FormControl
                     className='form-panel-input'
                     type='text'
                     placeholder='Username'
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
               <FormGroup controlId='formEmail' className='form-control-input'>
                  <Form.Label className='no-margin-label'>Email</Form.Label>
                  <FormControl
                     className={`form-panel-input ${
                        title === 'Edit' ? 'disabled-input' : ''
                     }`}
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
                     disabled={title === 'Edit' ? true : false}
                  />
               </FormGroup>
               <div className='button-group-form-panel'>
                  <Button className='form-control-btn' type='submit'>
                     {title}
                  </Button>
                  <Button
                     className='form-control-btn'
                     type='button'
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
