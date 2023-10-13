import React, { useState } from "react";
import { Routes, Route, Link, useRoutes, Navigate } from "react-router-dom";
import PrivateRoutes from "./Helper/PrivateRoutes";
import User from "./component/Home/User";
import Login from "./component/Home/Login";
import Home from "./component/Home/Home";
import Role from "./component/Home/Role";
import { Typography } from "@mui/material";
import Department from "./component/Home/Department";
import Location from "./component/Home/Location";

const RouterModule = () => {
  const token = localStorage.getItem("token");
  let auth = { token };
  return (
    <Routes>
      <Route
        path="/login"
        element={auth.token ? <Navigate to="/" /> : <Login />}
      />
      <Route path="*" element={<Typography>Not Found</Typography>} />
      <Route element={<PrivateRoutes requiredPermissions={["Dashboard"]} />}>
        <Route path="/" element={<Home />}>
          <Route
            element={
              <PrivateRoutes requiredPermissions={["User-Management"]} />
            }
          >
            <Route path="user" element={<User />} />
          </Route>
          <Route
            element={
              <PrivateRoutes requiredPermissions={["Role-Management"]} />
            }
          >
            <Route path="role" element={<Role />} />
          </Route>

          <Route path="department" element={<Department />} />
          <Route path="location" element={<Location />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterModule;
