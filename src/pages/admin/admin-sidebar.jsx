import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  BookOutlined,
  BankOutlined,
  ReadOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import { LogoIcon } from "../../assets/LogoIcon";

export const AdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer();
  };
  const location = useLocation();
  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={[location.pathname]}
      className="bg-primary"
      style={{
        height: "100%",
      }}
    >
      <div className="hidden p-1 py-3 md:flex justify-center static top-0">
        <LogoIcon />
      </div>
      <Menu.Item
        key="/admin/categories"
        icon={<AppstoreOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/categories">Kategoriyalar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/authors"
        icon={<ReadOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="authors">Mualliflar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/cities"
        icon={<EnvironmentOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="cities">Shaharlar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/languages"
        icon={<GlobalOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="languages">Tillar</Link>
      </Menu.Item>

      <Menu.Item
        key={"/admin/publishers"}
        icon={<BankOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="publishers">Nashriyotchilar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/books"
        icon={<BookOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/books">Kitoblar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/vacancies"
        icon={<SolutionOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/vacancies">Vakansiyalar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/profile"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/profile">Profil</Link>
      </Menu.Item>
    </Menu>
  );
};
