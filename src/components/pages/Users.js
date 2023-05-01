import { green, red } from '@ant-design/colors';
import { Button, Divider, Form, Input, List, Space, Typography } from 'antd';

import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { idGenerator } from '../../helpers/idGenerator';
import { store } from '../store/store';
import {
  addUserToList,
  editUserFromList,
} from '../store/users-list-store/usersListActions';
import { deleteUserFromList } from './../store/users-list-store/usersListActions';

const uiState = {
  editMode: false,
  changedValues: false,
};

const resetUiActions = () => uiState;
const types = {
  toggleEditMode: 'edit mode one',
  checkChangedValues: 'check changed values',
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
  const dispatch = useDispatch();
  const [uiActions, dispatchUiActions] = useReducer(
    uiReducer,
    uiState,
    resetUiActions
  );

  const [form] = Form.useForm();
  const [reRender, setReRender] = useState(true);
  const { editMode } = uiActions;
  const handleSubmit = (e) => {
    const confirmSubmit = window.confirm('confirm edit ?');
    if (!confirmSubmit) {
      alert('rollback');
      return;
    }

    console.log('sub');
    console.log(e);
    dispatch(editUserFromList({ id: user.id, ...form.getFieldsValue() }));
  };
  const handleEdit = () => {
    console.log('edit');

    dispatchUiActions({ type: types.toggleEditMode });
    setReRender((prev) => !prev);
  };

  useEffect(() => {
    console.log('render');
  }, [reRender]);

  const handleDelete = () => {
    // console.log(arguments);
    dispatch(deleteUserFromList({ id: user.id }));
    // console.log(user.id);
    // const checkDelete = window.confirm('confirm delete ? ');
    // if (checkDelete) {
    //   return dispatch(deleteUserFromList({ id: user.id }));
    // }
  };
  const handleInputChange = () => {
    const formValues = form.getFieldsValue();

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
      {user.id}
      <Form
        onFinish={handleSubmit}
        form={form}
        initialValues={{ name: user.name, username: user.username }}
      >
        <fieldset style={{ border: 'none' }} disabled={!editMode}>
          {Object.entries(user).map(([field, value]) => (
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
            type='primary'
            disabled={!uiActions.changedValues}
            htmlType='submit'
          >
            Submit
          </Button>
          <Button
            style={{ backgroundColor: green[3], color: 'white' }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      </Form>
    </List.Item>
  );
};
const UserLi = ({ user }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUserFromList({ id: user.id }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const { name, username } = e.target.form.values;
    // console.log(name, username);
    const {
      name: { value: name },
      username: { value: username },
    } = e.target;
    console.log(name, username);
    dispatch(editUserFromList({ id: user.id, name, username }));
  };
  return (
    <li>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          name
          <input type='text' name={'name'} defaultValue={user.name} />
        </label>
        <label className='flex flex-col'>
          username
          <input type='text' name={'username'} defaultValue={user.username} />
        </label>
        <button type='submit' style={{ border: '1px solid blue' }}>
          edit user
        </button>
        <button
          style={{ border: '1px solid blue' }}
          className='rounded-full p-2'
          onClick={handleDelete}
        >
          delete
        </button>
      </form>
    </li>
  );
};
const NewUserForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      username: { value: username },
    } = e.target;
    dispatch(addUserToList({ id: idGenerator(), name, username }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name='name'
          type='text'
          style={{ display: 'block', border: '1px solid' }}
        />
      </label>
      <label>
        User name
        <input
          name='username'
          type='text'
          style={{ display: 'block', border: '1px solid' }}
        />
      </label>

      <button
        className='mt-3'
        style={{ display: 'block', border: '2px solid lightblue' }}
        type='submit'
      >
        Add new User{' '}
      </button>
    </form>
  );
};
const Users = () => {
  const { Paragraph } = Typography;
  let usersList = useSelector((state) => state.usersList);
  console.log('render');
  // useEffect(() => {
  //   console.log('render');
  // }, [usersList]);

  return (
    <div>
      {/* {JSON.stringify(usersList)} */}
      <Typography level={3}>Users</Typography>
      <NewUserForm></NewUserForm>
      <Paragraph>
        <Divider orientation='left'>Users List</Divider>
      </Paragraph>
      <ul>
        {usersList.map((user) => (
          <UserLi key={user.id} {...{ user }}></UserLi>
        ))}
      </ul>
      {/* 
      <List
        size='large'
        header={<div>Users from JSON placeholder</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={usersList}
        renderItem={({ id, name, username }) => (
          <UsersListItem user={{ id, name, username }}></UsersListItem>
        )}
      /> */}
    </div>
  );
};

export default Users;
