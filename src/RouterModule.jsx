import { Dashboard } from "@mui/icons-material";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoutes from "./Helper/PrivateRoutes";
import Home from "./component/Home/Home";

const RouterModule = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      {/* <Route path="" element={<Login />} /> */}
      {/* <Route element={<PrivateRoutes />}>
        <Route path="test" element={<Zpl />}></Route>
        <Route path="qsystem" element={<Nav />} exact>
          <Route path="home" element={<Home />} />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default RouterModule;