import React from "react";
import Topnav from "./Topnav";
import Sidenav from "./Sidenav";
import User from "./User";
import CreateUser from "./CreateUser";
import DrawerContextProvider from "../../context/DrawerContext";
import UserDrawerContextProvider from "../../context/UserDrawerContext";
import { Outlet, Navigate } from "react-router-dom";

const Home = () => {
  return (
    <DrawerContextProvider>
      <UserDrawerContextProvider>
        <div className="home">
          <Sidenav />
          {/* <CreateUser/> */}

          <div className="topnavAndContent">
            <Topnav />
            {/* <User/> */}

            <Outlet />
          </div>
        </div>
      </UserDrawerContextProvider>
    </DrawerContextProvider>
  );
};

export default Home;
