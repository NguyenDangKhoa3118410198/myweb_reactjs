import React from 'react';
import { Modal, Form, Select } from 'antd';
import InputText from 'components/common/InputComponent/InputText';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import CancelButton from 'components/common/ButtonComponent/ButtonCancel';
import '../MainDash/mainDash.css';

interface FormData {
   address: string;
   phone: string;
   gender: string;
}

interface FormPanelProps {
   title: string;
   handleSubmit: () => void;
   formData: FormData;
   handleClose: () => void;
   isOpen?: any;
}

const FormPanel: React.FC<FormPanelProps> = ({
   title,
   handleSubmit,
   formData,
   handleClose,
   isOpen,
}) => {
   return (
      <Modal title={title} open={isOpen} onCancel={handleClose} footer={null}>
         <Form
            layout='vertical'
            onFinish={handleSubmit}
            initialValues={formData}
            validateTrigger='onSubmit'
         >
            <Form.Item
               label='Address'
               name='address'
               rules={[
                  { required: true, message: 'Please input your address!' },
               ]}
            >
               <InputText placeholder='Address' value={formData.address} />
            </Form.Item>

            <Form.Item
               label='Phone'
               name='phone'
               rules={[
                  {
                     required: true,
                     message: 'Please input your phone number!',
                  },
               ]}
            >
               <InputText placeholder='Phone' value={formData.phone} />
            </Form.Item>

            <Form.Item label='Gender' name='gender'>
               <Select value={formData.gender}>
                  <Select.Option value='Male'>Male</Select.Option>
                  <Select.Option value='Female'>Female</Select.Option>
               </Select>
            </Form.Item>

            <div className='button-group-form-panel'>
               <CancelButton
                  onClick={handleClose}
                  label='Cancel'
                  className='form-control-btn'
               />
               <PrimaryButton
                  type='primary'
                  htmlType='submit'
                  label={title}
                  className='form-control-btn'
               />
            </div>
         </Form>
      </Modal>
   );
};

export default FormPanel;
