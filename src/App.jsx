import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/auth/login";
import { AdminLayout } from "./pages/admin/admin-layout";
import { CreateProduct } from "./pages/admin/create-product";
import { CreateCacansy } from "./pages/admin/create-vacansy";
import { SuperAdminLayout } from "./pages/super-admin/super-admin-layout";
import { AdminChange } from "./pages/super-admin/admin-change";
import { AdminCreate } from "./pages/super-admin/admin-create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/super-admin/profile";
import { ProfileEditPage } from "./pages/super-admin/update-profile";
import { AdminProfile } from "./pages/admin/admin-profile";
import { AdminDetailPage } from "./pages/super-admin/users-detail-page";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CreateProduct />} />
          <Route path="create-vacancy" element={<CreateCacansy />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="update-profile" element={<ProfileEditPage />} />
        </Route>

        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route path="admin-create" element={<AdminCreate />} />
          <Route path="admin-change" element={<AdminChange />} />
          <Route path="/super-admin/detail-page/:id" element={<AdminDetailPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-profile" element={<ProfileEditPage />} />
        </Route>

        <Route path="*" element={<h1>lorem...</h1>} />
      </Routes>
    </div>
  );
};

export default App;
