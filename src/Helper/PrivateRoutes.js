import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ requiredPermissions }) => {
  const token = localStorage.getItem("token");
  const access_permission = localStorage.getItem("access");

  const hasAllPermissions = requiredPermissions.every((permission) =>
    access_permission?.includes(permission)
  );
  console.log(token);
  if (token) {
    // console.log(token);
    if (hasAllPermissions) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    // console.log(token);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;

// import React, { Outlet, Navigate } from "react-router-dom";
// import Home from "../component/Home/Home";
// import Login from "../component/Home/Login";
// import User from "../component/Home/User";

// const PrivateRoutes = ({ requiredPermissions }) => {
//   const token = localStorage.getItem("token");
//   const access_permission = useSelector((state) => state.user.access);

//   let auth = { token };

//   const hasAllPermissions = requiredPermissions.every((permisssion) =>
//     access_permission?.includes(permisssion)
//   );

//   // return auth.token ? <Outlet /> : <Navigate to="/" />;

//   if (auth.token) {
//     if (hasAllPermissions) {
//       return <Outlet/>
//     } else {
//       <Navigate to="/unauthorized"/>
//     }
//   } else {
//     <Navigate to="/"/>
//   }
// };

// export default PrivateRoutes;
