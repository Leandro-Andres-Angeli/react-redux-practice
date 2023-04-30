import { green, red } from "@ant-design/colors";
import { Button, Divider, Form, Input, List, Typography } from "antd";

import React, { useReducer } from "react";
import { store } from "../store/store";
const uiState = {
  editMode:false,
}
const resetUiActions = ()=>uiState
const types = {
  toggleEditMode:'edit mode one'
}
const uiReducer = (state,action)=>{
  switch (action.type){
    case types.toggleEditMode :
    return {...state,editMode: !state.editMode  }
    default:
      return state
  }
  

}
const UsersListItem = ({ user }) => {
  const [uiActions , dispatchUiActions] = useReducer(uiReducer,uiState,resetUiActions)
  // return (
  //   <List.Item>
  //     <List
     
  //   dataSource={Object.entries(user)}
  //       renderItem={ ([field,data])=> (
  //         <List.Item >{field} : {data}</List.Item>
  //       )}
  //     />

    
  //   </List.Item>
  // );
  const {editMode} = uiActions
  const handleSubmit=()=>{
    console.log("sub")
  }
  const handleEdit = ()=>{
    console.log('edit')
    dispatchUiActions({type : types.toggleEditMode})
    
  }
  return (
    <List.Item>
      <div> {JSON.stringify(uiActions)}</div>
    
       <Form onFinish={handleSubmit}> 
        <fieldset style={{border:"none"}} disabled = {!editMode}>
        {Object.entries(user).filter(([field])=> field !== "id").map(([field,value])=>
      ( <Form.Item key={field} label={field} >
         <Input defaultValue={value} />
      </Form.Item>
       ))}
       </fieldset>
       
       <Button type="primary"   disabled = {!editMode} htmlType="submit">Submit</Button>
       <Button style={{backgroundColor:green[3],color:"white"}}  onClick={handleEdit} >Edit</Button>
       <Button  danger >Delete</Button>
       
       </Form>
    
    </List.Item>
  );
};

const Users = () => {
  const { Paragraph } = Typography;
  const { usersList } = store.getState();

  return (
    <div>
      <Typography level={3}>Users</Typography>
      <Paragraph>
        <Divider orientation="left">Users List</Divider>
      </Paragraph>

      <List
        size="large"
        header={<div>Users from JSON placeholder</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={usersList}
        renderItem={({ id, name, username }) => (
          <UsersListItem user={{ id, name, username }}></UsersListItem>
        )}
      />
    </div>
  );
};

export default Users;
