import React from "react";
import { blue } from "@ant-design/colors";
import Typography from "antd/es/typography/Typography";
import { List } from "antd";
import "../styles/navbar-styles.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { link: "todo-list", path: "/" },
    { link: "users-list", path: "/users" },
  ];
  return (
    <nav
      className="navbar"
      style={{ backgroundColor: blue[5], padding: "1rem", color: "white" }}
    >
      <Typography.Title level={3} style={{ color: "white" }}>
        Redux And Reducer Practice
      </Typography.Title>
      <List
        className="navbar-ul"
        dataSource={links}
        renderItem={({ link, path }) => (
          <List.Item>
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              exact 
              style={{ color: "white" }}
              to={path}
            >
              {link}
            </NavLink>
          </List.Item>
        )}
      />
    </nav>
  );
};

export default Navbar;
