import { Divider, List, Typography } from "antd";

import React from "react";
import { store } from "../store/store";

const UsersListItem = ({ user }) => {
  return (
    <List.Item>
      <List
     
    dataSource={Object.entries(user)}
        renderItem={ ([field,data])=> (
          <List.Item >{field} : {data}</List.Item>
        )}
      />

    
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
