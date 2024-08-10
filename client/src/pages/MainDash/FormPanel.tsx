import React from 'react';
import { Form, Modal } from 'antd';
import './mainDash.css';
import InputText from 'components/common/InputComponent/InputText';
import InputEmail from 'components/common/InputComponent/InputEmail';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import CancelButton from 'components/common/ButtonComponent/ButtonCancel';

interface FormData {
   name: string;
   username: string;
   email: string;
}

interface FormPanelProps {
   title: string;
   formData: FormData;
   handleClose: () => void;
   handleSubmit?: any;
   isOpen?: any;
}

const FormPanel: React.FC<FormPanelProps> = ({
   title,
   formData,
   handleClose,
   handleSubmit,
   isOpen,
}) => {
   return (
      <Modal title={title} open={isOpen} footer={null} onCancel={handleClose}>
         <Form
            layout='vertical'
            onFinish={handleSubmit}
            initialValues={formData}
            validateTrigger='onSubmit'
         >
            <Form.Item
               label='Name'
               name='name'
               rules={[{ required: true, message: 'Please input your name!' }]}
            >
               <InputText placeholder='Name' />
            </Form.Item>
            <Form.Item
               label='Username'
               name='username'
               rules={[
                  { required: true, message: 'Please input your username!' },
               ]}
            >
               <InputText placeholder='Username' />
            </Form.Item>
            <Form.Item
               label='Email'
               name='email'
               rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                     pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                     message: 'Please enter a valid email!',
                  },
               ]}
            >
               <InputEmail placeholder='Email' disabled={title === 'Edit'} />
            </Form.Item>
            <Form.Item>
               <div className='button-group-form-panel'>
                  <CancelButton
                     className='form-control-btn'
                     onClick={() => {
                        handleClose();
                     }}
                     label='Cancel'
                  />
                  <PrimaryButton
                     className='form-control-btn'
                     label={title}
                     htmlType='submit'
                  />
               </div>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default FormPanel;
