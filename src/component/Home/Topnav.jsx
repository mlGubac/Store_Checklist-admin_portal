import React, { useState, createContext, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { DrawerContext } from "../../context/DrawerContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Topnav = () => {
  const { setIsOpen, isOpen } = useContext(DrawerContext);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    navigate("/login");
  };
  return (
    <>
      <div className="topnav">
        <div className="topnav-menu-icon">
          <IconButton onClick={onClickButton} size="large">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="topnav-logout">
          <IconButton size="large" onClick={handleClickOpen}>
            <LogoutIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to logout?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                autoFocus
                variant="outlined"
                color="error"
              >
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Topnav;
