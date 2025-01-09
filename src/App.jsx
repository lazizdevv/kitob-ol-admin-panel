import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./pages/auth/protected";
import { adminRoutes, publicRoutes, superAdminRoutes } from "./routes/routes";
import { MainLayout } from "./layouts/layout";

const App = () => {
  return (
    <Routes>
      {publicRoutes?.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}

      <Route
        element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}
      >
        <Route path="/admin" element={<MainLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            {superAdminRoutes?.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>

          {adminRoutes?.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
