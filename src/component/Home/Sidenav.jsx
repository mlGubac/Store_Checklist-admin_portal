import React, { useState, createContext, useContext } from "react";
import "../../css/Styles.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchemaIcon from "@mui/icons-material/Schema";

import logo from "./../../assets/SC Logo.png";

import { DrawerContext } from "../../context/DrawerContext";
import { ListItemIcon, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
  const { isOpen } = useContext(DrawerContext);

  const navigate = useNavigate();

  const role = localStorage.getItem("access");

  return (
    <>
      <div className={isOpen ? "sidenav-active" : "sidenav"}>
        <div className="sidenav-img">
          <img src={logo} alt="Logo" className="sidenav-logo" />
        </div>
        <div>
          <Divider />
          <List>
            {role?.includes("Dashboard") && (
              <ListItem>
                <ListItemButton onClick={() => navigate("/")}>
                  <ListItemIcon className="listItemButton">
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText className="listItemSide">
                    Dashboard
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )}

            {role?.includes("User-Management") && (
              <ListItem>
                <ListItemButton onClick={() => navigate("user")}>
                  <ListItemIcon className="listItemButton">
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText className="listItemSide">
                    User Account
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )}

            {role?.includes("Role-Management") && (
              <ListItem>
                <ListItemButton onClick={() => navigate("role")}>
                  <ListItemIcon className="listItemButton">
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText className="listItemSide">
                    Role Management
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )}

            <ListItem>
              <ListItemButton onClick={() => navigate("department")}>
                <ListItemIcon className="listItemButton">
                  <SchemaIcon />
                </ListItemIcon>
                <ListItemText className="listItemSide">Department</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => navigate("location")}>
                <ListItemIcon className="listItemButton">
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText className="listItemSide">Location</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
