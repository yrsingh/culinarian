import React from "react";
import { Link } from "react-router-dom";

import { Menu } from "antd";
import "antd/dist/antd.css";

const Header = (props) => {
  return (
    <Menu
      onClick={props.handleClick}
      defaultSelectedKeys={[props.current]}
      mode="horizontal"
      theme="light"
    >
      <Menu.Item key="1">
        <Link to="/">Search</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/add">Add/Edit</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
