import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { loadState } from "../config/stroge";
import { menuItems, superMenuItems } from "../routes/routes";

export const SideBar = ({ collapsed, closeDrawer }) => {
  const location = useLocation();
  const user = loadState("user");

  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer();
  };

  const mapToMenuItems = (items) =>
    items.map(({ key, icon, label }) => ({
      key,
      icon,
      label: (
        <Link to={key} onClick={handleMenuItemClick}>
          {label}
        </Link>
      ),
      style: {
        color: location.pathname === key && "white",
        backgroundColor: location.pathname === key && "#2c3033",
      },
    }));

  const combinedMenuItems =
    user?.role === "superadmin"
      ? [...mapToMenuItems(superMenuItems), ...mapToMenuItems(menuItems)]
      : mapToMenuItems(menuItems);

  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]}
      className="bg-primary"
      style={{ height: "100%" }}
      items={[...combinedMenuItems]}
    />
  );
};
