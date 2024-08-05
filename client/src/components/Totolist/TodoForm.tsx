import React from 'react';
import { Form } from 'antd';
import { addTodo } from 'Data/fetchData';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import InputText from 'components/common/InputComponent/InputText';

interface TodoFormProps {
   setTodolist: any;
   setTodo: React.Dispatch<React.SetStateAction<string>>;
   todo: string;
   scrollToBottom: any;
}

const TodoForm: React.FC<TodoFormProps> = ({
   setTodolist,
   setTodo,
   todo,
   scrollToBottom,
}) => {
   const [form] = Form.useForm();

   const onFinish = async (values: { newTodo: string }) => {
      const trimmedTask = values.newTodo.trim();
      if (trimmedTask) {
         const response = await addTodo({ task: trimmedTask });
         setTodolist((prevTodolist: any) => [...prevTodolist, response]);
      }
      form.resetFields();
      scrollToBottom();
   };

   return (
      <Form form={form} className='todo-form-container' onFinish={onFinish}>
         <Form.Item name='newTodo' className='container-new-todo-input'>
            <InputText
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
               style={{ margin: '10px', fontWeight: 600 }}
            />
         </Form.Item>
      </Form>
   );
};

export default TodoForm;
