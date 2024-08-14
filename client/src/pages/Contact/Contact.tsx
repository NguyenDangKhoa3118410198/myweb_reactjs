import React from 'react';
import { Form, Input, Button } from 'antd';
import './contact.css';
import backgroundImage from '../../imgs/background-contact.png';
import InputText from 'components/common/InputComponent/InputText';
import InputEmail from 'components/common/InputComponent/InputEmail';

const Contact = () => {
   const onFinish = (values: any) => {
      console.log('Received values from form: ', values);
   };

   return (
      <div className='contact-form-wrapper'>
         <div className='contact-form main-container'>
            <h1>We will address your issues</h1>
            <div className='container-contact'>
               <div className='main-contact'>
                  <div className='content-contact'>
                     <h2>
                        <strong>Contact Us</strong>
                     </h2>
                     <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                           name='name'
                           label='Name'
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter your name!',
                              },
                           ]}
                        >
                           <InputText placeholder='Enter Your Name' />
                        </Form.Item>

                        <Form.Item
                           label='Email'
                           name='email'
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input your email!',
                              },
                              {
                                 pattern:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                 message: 'Please enter a valid email!',
                              },
                           ]}
                        >
                           <InputEmail placeholder='Enter Your Email' />
                        </Form.Item>

                        <Form.Item
                           name='message'
                           label='Message'
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter your message!',
                              },
                           ]}
                        >
                           <Input.TextArea placeholder='Your Message' />
                        </Form.Item>

                        <Form.Item>
                           <Button
                              type='primary'
                              htmlType='submit'
                              className='contact-form-btn'
                           >
                              Send <i className='fas fa-paper-plane'></i>
                           </Button>
                        </Form.Item>
                     </Form>
                  </div>
                  <div className='contact-form-img'>
                     <img
                        style={{ filter: 'hue-rotate(335deg)' }}
                        src={backgroundImage}
                        alt='Contact Background'
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Contact;
