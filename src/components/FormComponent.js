import React from 'react'
import { Button, Form, Input} from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo, showList } from './store/store';
import { idGenerator } from '../helpers/idGenerator';
const FormComponent = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
 const testReducer=()=>{
 
    dispatch(showList())
 }
 const handleSubmit = (values)=>{
   
   if (values.newTodo === undefined || values.newTodo.trim() === '' ){
     return}
   dispatch(addTodo({id:idGenerator(),todo:values.newTodo}))
   form.resetFields()
    
 }

    return (
        <Form
         onFinish={handleSubmit}
         form={form}
         onSubmit={()=>console.log('submit')}
          style={{ maxWidth: 600 , padding:"1rem" }}
        >
          
          <Form.Item label="New To Do"  name='newTodo'>
            <Input placeholder="Add ToDo" />
          </Form.Item>
          
          <Form.Item>
            
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            <Form.Item>
            <Button type="primary" className='test' onClick={testReducer}>Test</Button>
            </Form.Item>
        </Form>
      
  )
}

export default FormComponent