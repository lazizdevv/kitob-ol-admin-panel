import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SuperAdminSideBar } from "./super-admin-sidebar";
import { Layout, Button, Drawer, Tooltip, Typography } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const { Header, Sider, Content } = Layout;

export const SuperAdminLayout = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });

    toast.info("Kirish uchun qayta login qilishingiz kerak", {
      position: "top-center",
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        className="hidden lg:block"
      >
        <SuperAdminSideBar collapsed={collapsed} closeDrawer={closeDrawer} />
      </Sider>

      <Layout className="site-layout">
        <Header className="flex justify-between items-center shadow-md p-2 bg-[#CDCDCD]">
          <Button
            type="primary"
            onClick={drawerVisible ? closeDrawer : showDrawer}
            className="lg:hidden"
            icon={drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className="hidden lg:flex ml-4"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Typography.Title level={4}>
            Super Administrator Paneli
          </Typography.Title>

          <Tooltip title="Tizimdan chiqish">
            <Button
              type="primary"
              className="mr-5"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            ></Button>
          </Tooltip>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>

        <Drawer
          title="Super Admin Menu"
          placement="left"
          onClose={closeDrawer}
          visible={drawerVisible}
          className="lg:hidden"
          bodyStyle={{ padding: 0 }}
          headerStyle={{ backgroundColor: "#001529", color: "white" }}
        >
          <SuperAdminSideBar collapsed={false} closeDrawer={closeDrawer} />
        </Drawer>
      </Layout>
    </Layout>
  );
};
