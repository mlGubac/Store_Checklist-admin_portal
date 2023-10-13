import React, { useContext, useEffect, useState } from "react";
import logo from "./../../assets/SC Logo.png";
import AppTextBox from "./../sample/AppTextBox";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { useLogin, useChangePassword } from "../../hooks/useLogin";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ModalContextProvider, { ModalContext } from "../../context/ModalContext";
import { useRoleGet } from "../../hooks/useRoleManagement";
import { useUserGet } from "../../hooks/UserController";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");

  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  //hook login
  const validationSchema = yup.object({
    username: yup.string().required("Username Required"),
    password: yup.string().required("Password Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors: errorLogin },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useLogin();

  const { data: userData } = useUserGet();

  const onSubmit = (data) => {
    const obj = {
      username: data.username,
      password: data.password,
    };

    login.mutate(obj, {
      onSuccess: (response) => {
        const access =
          response?.data?.data?.user?.role?.access_permission.split(", ");

        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("access", JSON.stringify(access));
        // console.log(response?.data?.data?.user?.role?.access_permission);
        if (obj.username === obj.password) {
          setIsModalOpen(true);
          setOldPassword(obj.password);
        } else {
          navigate("/");
        }
      },
      onError: (err) => {
        setOpenSnackBar(true);
        setMessage(err?.response?.data?.message);
      },
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Remove token
      localStorage.removeItem("token");
      localStorage.removeItem("access");
      if (isModalOpen) {
        // prevent the page from unloading
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isModalOpen]);

  //change password
  const changePasswordSchema = yup.object({
    old_password: yup.string().required("Old Password Required"),
    new_password: yup
      .string()
      .required("New Password Required")
      .oneOf([yup.ref("repeatnew_password"), null], "Passwords must match"),
    repeatnew_password: yup
      .string()
      .required("Repeat New Password Required")
      .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  });

  const {
    handleSubmit: changepasswordHandleSubmit,
    control: changepasswordControl,
    setValue,
    setError: setErrorChangePassword,
    formState: { errors: errorChangePass },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      repeatnew_password: "",
    },
  });

  const changepassword = useChangePassword();

  const onSubmitChangePassword = (data) => {
    const obj = {
      old_password: data.old_password,
      new_password: data.new_password,
      repeatnew_password: data.repeatnew_password,
    };

    if (oldPassword === obj.new_password) {
      const message = "Enter a different password";
      setErrorChangePassword("new_password", {
        type: "validate",
        message,
      });
      setErrorChangePassword("repeatnew_password", {
        type: "validate",
        message,
      });
    } else {
      changepassword.mutate(obj, {
        onSuccess: async (response) => {
          setIsModalOpen(false);
          await navigate("/home");
        },
        onError: (err) => {
          setOpenSnackBar(true);
          setMessage(err?.response?.data?.message);
        },
      });
    }
  };

  //Modal
  const onClose = () => {
    localStorage.removeItem("token");
    setIsModalOpen(false);
    setValue("old_password", "");
    setValue("new_password", "");
    setValue("repeatnew_password", "");
  };

  //snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const checkOldPassword = (e) => {
    if (e?.target?.value !== oldPassword) {
      const message = "Enter you default password!!!";
      setErrorChangePassword("old_password", {
        type: "validate",
        message,
      });
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-left">
          <div className="login-right-logo">
            <img src={logo} />
          </div>
          <h2>
            STORE <span>CHECKLIST</span>
          </h2>
        </div>

        <div className="login-right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-right-textbox">
              <h1>LOGIN</h1>
              <div className="input-username">
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="input-with-sx"
                      label="Username"
                      variant="outlined"
                      helperText={errorLogin?.username?.message}
                      error={Boolean(errorLogin?.username)}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignContent: "center",
                              backgroundColor: "#E1E8EB",
                              height: 55,
                              width: 50,
                              marginLeft: -13,
                              border: "0px solid green",
                              marginRight: 5,
                            }}
                          >
                            <InputAdornment position="start">
                              <AccountCircle sx={{ ml: 1.5 }} />
                            </InputAdornment>
                          </div>
                        ),
                      }}
                    />
                  )}
                />
              </div>

              <div className="input-password">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      helperText={errorLogin?.password?.message}
                      error={Boolean(errorLogin?.password)}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignContent: "center",
                              backgroundColor: "#E1E8EB",
                              height: 55,
                              width: 50,
                              marginLeft: -13,
                              border: "0px solid green",
                              marginRight: 5,
                            }}
                          >
                            <InputAdornment position="start">
                              <KeyIcon sx={{ ml: 1.5 }} />
                            </InputAdornment>
                          </div>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="login-right-button">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#b59657",
                  px: "10px",
                }}
              >
                Login <ArrowForwardIcon />
              </Button>
            </div>
          </form>
        </div>

        <div className="login-modal">
          <Dialog open={isModalOpen}>
            <form onSubmit={changepasswordHandleSubmit(onSubmitChangePassword)}>
              <DialogTitle justifyContent="center">Change Password</DialogTitle>
              <DialogContent>
                <Controller
                  name="old_password"
                  control={changepasswordControl}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onBlur={checkOldPassword}
                      label="Old Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      helperText={errorChangePass?.old_password?.message}
                      error={Boolean(errorChangePass?.old_password)}
                      sx={{ my: 1 }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="new_password"
                  control={changepasswordControl}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="New Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      helperText={errorChangePass?.new_password?.message}
                      error={Boolean(errorChangePass?.new_password)}
                      sx={{ my: 1 }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />{" "}
                <Controller
                  name="repeatnew_password"
                  control={changepasswordControl}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Repeat New Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      variant="outlined"
                      helperText={errorChangePass?.repeatnew_password?.message}
                      error={Boolean(errorChangePass?.repeatnew_password)}
                      sx={{ my: 1 }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button color="error" variant="contained" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="success" variant="contained">
                  Continue
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>

        <div className="login-snackbar">
          <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Login;
