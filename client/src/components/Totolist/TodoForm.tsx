import React from 'react';
import { Form, Input } from 'antd';
import { addTodo } from 'Data/fetchData';
import PrimaryButton from 'components/common/ButtonPrimary';

interface TodoFormProps {
   setTodolist: any;
   setTodo: React.Dispatch<React.SetStateAction<string>>;
   todo: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodolist, setTodo, todo }) => {
   const [form] = Form.useForm();

   const onFinish = async (values: { newTodo: string }) => {
      const trimmedTask = values.newTodo.trim();
      if (trimmedTask) {
         const response = await addTodo({ task: trimmedTask });
         setTodolist((prevTodolist: any) => [...prevTodolist, response]);
      }
      form.resetFields();
   };

   return (
      <Form form={form} className='todo-form-container' onFinish={onFinish}>
         <Form.Item name='newTodo' className='container-new-todo-input'>
            <Input
               type='text'
               className='new-todo-input'
               placeholder='New todo'
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
            />
         </Form.Item>
         <Form.Item>
            <PrimaryButton
               label='Enter'
               htmlType='submit'
               style={{ margin: '10px' }}
            />
         </Form.Item>
      </Form>
   );
};

export default TodoForm;
