import React from 'react'
import {  blue } from "@ant-design/colors";
import Typography from 'antd/es/typography/Typography';
import { List } from 'antd';
import "../styles/navbar-styles.css"

const Navbar = () => {
    const links =[ "todo-list","users-list"]
  return (
    <nav className="navbar" style={{ backgroundColor: blue[5] , padding:"1rem",color:"white" }}>
  <Typography.Title level={3} style={{color:"white"}}>
    Redux And Reducer Practice
  </Typography.Title>
  <List
    className='navbar-ul'
    dataSource={links}
    renderItem={(item) => (
      <List.Item  style={{color:"white"}}>
       {item}
      </List.Item>
    )}
  />
</nav>
  )
}

export default Navbar