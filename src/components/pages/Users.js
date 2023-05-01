import { green, red } from "@ant-design/colors";
import { Button, Divider, Form, Input, List, Space, Typography } from "antd";

import React, { useReducer, useRef, useState } from "react";
import { store } from "../store/store";
const uiState = {
  editMode: false,
  changedValues: false,
};
const resetUiActions = () => uiState;
const types = {
  toggleEditMode: "edit mode one",
  checkChangedValues: "check changed values",
};
const uiReducer = (state, action) => {
  switch (action.type) {
    case types.toggleEditMode:
      return { ...state, editMode: !state.editMode };
    case types.checkChangedValues:
      return { ...state, changedValues: action.payload };
    default:
      return state;
  }
};
const UsersListItem = ({ user }) => {
  const [uiActions, dispatchUiActions] = useReducer(
    uiReducer,
    uiState,
    resetUiActions
  );
  const [form] = Form.useForm();
  const formRef = useRef()
  // const [formState, setFormState] = useState({
  //   name: user.name,
  //   username: user.username,
  // });

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
  const { editMode } = uiActions;
  const handleSubmit = (e) => {
    console.log("sub");
    console.log(e);
    console.log(form.getFieldsValue());
  };
  const handleEdit = (e) => {
    console.log("edit");
    dispatchUiActions({ type: types.toggleEditMode });
   
    
  };
  const handleInputChange = () => {
    const formValues = form.getFieldsValue();
    // console.log(formValues)
    //  const trimmedForm =   Object.keys(formValues).

    //  console.log(trimmedForm)
    const trimmedForm = Object.keys(formValues).reduce(
      (acc, curr, arr) => ({ ...acc, [curr]: formValues[curr].trim() }),
      {}
    );

    const checkIfValuedChanged =
      JSON.stringify(trimmedForm) ===
      JSON.stringify({ name: user.name, username: user.username });
    dispatchUiActions({
      type: types.checkChangedValues,
      payload: !checkIfValuedChanged,
    });
  };
  // const handleFieldsChange = (e) => {
  //   console.log(e)
  //   console.log("change");
  // };
  return (
    <List.Item>
      <div> {JSON.stringify(uiActions)}</div>

      <Form
        onFinish={handleSubmit}
      
        form={form}
        initialValues={{ name: user.name, username: user.username }}
        focus={(uiActions.editMode).toString()}
      >
        <fieldset style={{ border: "none" }} disabled={!editMode}>
          {Object.entries(user)
            .filter(([field]) => field !== "id")
            .map(([field, value]) => (
              <Form.Item
                key={field}
                label={field}
                name={field}
                onChange={handleInputChange}
              >
                <Input />
              </Form.Item>
            ))}
        </fieldset>
        <Space>
          <Button
            type="primary"
            disabled={!uiActions.changedValues}
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            style={{ backgroundColor: green[3], color: "white" }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button danger>Delete</Button>
        </Space>
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
