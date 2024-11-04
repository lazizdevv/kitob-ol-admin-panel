import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Menu } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  BookOutlined,
  BankOutlined,
  AppstoreAddOutlined,
  ReadOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { LogoIcon } from "../../assets/LogoIcon";

export const SuperAdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer();
  };

  const location = useLocation();

  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={[location.pathname]}
      style={{
        backgroundColor: "#CDCDCD",
        color: "#e0e0e0",
        height: "100%",
      }}
    >
      <Flex justify="center" className="hidden p-2 py-3 md:flex  static top-0">
        <LogoIcon />
      </Flex>

      <Menu.Item
        key="/super-admin/admin-create"
        icon={<UserAddOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/admin-create">Admin Yaratish</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/admin-change"
        icon={<TeamOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/admin-change">Adminlar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/all-users"
        icon={<TeamOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/all-users">Foydalanuvchilar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/categories"
        icon={<AppstoreAddOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/categories">Kategoriyalar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/cities"
        icon={<EnvironmentOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/cities">Shaharlar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/languages"
        icon={<GlobalOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="languages">Tillar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/authors"
        icon={<ReadOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/authors">Mualliflar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/publishers"
        icon={<BankOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="publishers">Nashriyotchilar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/books"
        icon={<BookOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/books">Kitoblar</Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/vacancies"
        icon={<SolutionOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/vacancies">Vakansiyalar</Link>
      </Menu.Item>
      <Menu.Item
        key="/super-admin/profile"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/profile">Profil</Link>
      </Menu.Item>
    </Menu>
  );
};
