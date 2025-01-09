import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Button, Drawer, Tooltip, Space, Flex, message } from "antd";
import {
  CloseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { SideBar } from "./sidebar";
import { loadState } from "../config/stroge";
import { LogoIcon } from "../assets/LogoIcon";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const user = loadState("user");
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    message.info("Kirish Uchun Qayta Login Qiling!");
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        className="hidden lg:block bg-primary"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="hidden p-1 py-3 md:flex justify-center static top-0">
          <LogoIcon />
        </div>
        <SideBar collapsed={collapsed} closeDrawer={closeDrawer} />
      </Sider>
      <Layout>
        <Header className="p-3 flex justify-between items-center shadow-md bg-primary sticky top-0">
          <Button
            type="primary"
            onClick={showDrawer}
            className="lg:hidden"
            icon={<MenuUnfoldOutlined />}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className="hidden lg:flex"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Space>
            <h1 className={`text-lg font-bold text-center flex-1 text-dark`}>
              {role == "admin"
                ? "Administrator Paneli"
                : "Super Administrator Paneli"}
            </h1>
          </Space>

          <Tooltip placement="left" title="Tizimdan chiqish">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            ></Button>
          </Tooltip>
        </Header>

        <Content
          style={{
            height: "calc(100lvh - 64px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#2C3033 #F5F5F6",
            scrollBehavior: "smooth",
          }}
          className="bg-accent px-3"
        >
          <Outlet />
        </Content>

        <Drawer
          title={<Flex justify="center">Admin Menu</Flex>}
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          className="lg:hidden"
          styles={{
            header: { background: "#2C3033", color: "white" },
            body: { padding: 0 },
          }}
          closeIcon={
            <Flex className="absolute right-3">
              <Button danger type="primary" icon={<CloseOutlined />} />
            </Flex>
          }
        >
          <SideBar collapsed={false} closeDrawer={closeDrawer} />
        </Drawer>
      </Layout>
    </Layout>
  );
};
