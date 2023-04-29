import React from "react";
import {  Typography } from 'antd';
import { AntDesignOutlined  } from '@ant-design/icons';
const ListItem = ({ id, todo }) => {

  return (
    <>
      <AntDesignOutlined />
      <Typography.Text>{todo}</Typography.Text>
    </>
  );
};

export default ListItem;
