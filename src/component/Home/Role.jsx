import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import * as yup from "yup";

//Icon
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyIcon from "@mui/icons-material/Reply";

import ModeEditIcon from "@mui/icons-material/ModeEdit";

// Table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import {
  Alert,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Menu,
  Modal,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  useRoleCreate,
  useRoleGet,
  useRoleArchive,
  useRoleUpdate,
} from "../../hooks/useRoleManagement";
import AppTextBox from "../sample/AppTextBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import moment from "moment/moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const Role = () => {
  //useState
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [archiveData, setArchiveData] = useState(null);

  const [openModalArchive, setOpenModalArchive] = useState();
  const [archiveChecked, setArchiveChecked] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [viewAccessPermission, setViewAccessPermission] = useState(false);

  const [editRoleManagement, setEditRoleManagement] = useState(false);
  const [accessData, setAccessData] = useState();

  //get hook
  const {
    data: roleData,
    isLoading: roleDataLoading,
    isError: roleDataError,
    onSearchData,
    onPageChange,
    onRowChange,
    onArchiveDeactivated,
    onArchiveActive,
  } = useRoleGet();

  const {
    mutate: createRoleMutation,
    data: createRoleData,
    isSuccess: roleCreateSuccess,
    isError: createRoleIsError,
    error: createRoleError,
  } = useRoleCreate();

  const {
    mutate: roleArchive,
    data: archiveRoleData,
    isSuccess: archiveRoleSuccess,
    isError: archiveRoleIsError,
    error: archiveRoleError,
  } = useRoleArchive();

  const {
    mutate: roleUpdate,
    data: roleUpdateData,
    isSuccess: roleUpdateSuccess,
    isError: roleUpdateIsError,
    error: roleUpdateError,
  } = useRoleUpdate();

  //Create Role Schema

  const createRoleSchema = yup.object({
    role_name: yup.string().required("Role Name Required"),
    access_permission: yup
      .array()
      .required("Access Required")
      .typeError("Access Required"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    reset,
    formState: { errors: errorAddRole },
  } = useForm({
    resolver: yupResolver(createRoleSchema),
    defaultValues: {
      role_name: "",
      access_permission: [],
      id: "",
    },
  });

  // Create Role

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditRoleManagement(false);
    setOpenDialog(false);
    handleClear();
  };

  const handleClear = () => {
    reset({ access_permission: [], role_name: "" });
    setViewAccessPermission(false);
  };

  // Create Checkbox Role
  const handleChangeAll = (event) => {
    if (event.target.checked) {
      setValue(
        "access_permission",
        role_list.map((role) => role.value)
      );
    } else {
      setValue("access_permission", []);
    }
  };

  // MoreVert button
  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (event) => {
    setOpen(false);
    setAnchorEl(null);
  };

  //Modal Archive
  const handleCloseModalArchive = () => setOpenModalArchive(false);

  const handleArchive = (e) => {
    if (archiveChecked) {
      const obj = {
        id: archiveData.id,
        status: true,
      };
      roleArchive(obj);
    } else {
      const obj = {
        id: archiveData.id,
        status: false,
      };
      roleArchive(obj);
    }
  };

  useEffect(() => {
    if (archiveRoleSuccess) {
      setOpenModalArchive(false);
      setSnackbarMessage(archiveRoleData?.data?.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }

    if (archiveRoleIsError) {
      setOpenModalArchive(false);
      setSnackbarMessage(archiveRoleError?.response?.data?.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [archiveRoleSuccess, archiveRoleIsError]);

  //Checkbox Archive

  const handleArchiveCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setArchiveChecked(isChecked);

    if (isChecked) {
      onArchiveDeactivated();
    } else {
      onArchiveActive();
    }
  };

  //Snackbar

  const handleClickSnackBar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Create Role Function
  const role_list = [
    {
      id: 1,
      name: "Dashboard",
      value: "Dashboard",
    },
    {
      id: 2,
      name: "User Management",
      value: "User-Management",
    },
    {
      id: 3,
      name: "Role Management",
      value: "Role-Management",
    },
  ];

  const onSubmit = (data) => {
    if (editRoleManagement) {
      roleUpdate(data);
      handleClickSnackBar();
    } else {
      createRoleMutation(data);
      handleClickSnackBar();
    }
  };

  useEffect(() => {
    if (roleCreateSuccess) {
      setSnackbarMessage(createRoleData?.data?.message);
      setSnackbarSeverity("success");
      handleCloseDialog();
    }
    if (createRoleIsError) {
      setSnackbarMessage(createRoleError?.response?.data?.message);
      setSnackbarSeverity("error");
      handleCloseDialog();
    }
    if (roleUpdateSuccess) {
      setSnackbarMessage(roleUpdateData?.data?.message);
      setSnackbarSeverity("success");
      handleCloseDialog();
    }
    if (roleUpdateIsError) {
      setSnackbarMessage(roleUpdateError?.response?.data?.message);
      setSnackbarSeverity("error");
      // console.log(roleUpdateError?.response?.data?.message);
    }
  }, [
    roleCreateSuccess,
    createRoleIsError,
    roleUpdateSuccess,
    roleUpdateIsError,
  ]);

  return (
    <div className="user-container">
      <div className="user-buttoninput">
        <div className="user-buttoninput-left">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{ width: "100%" }}
          >
            <div className="user-buttoninput-left-textfield">
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h4"
                id="tableTitle"
                component="div"
              >
                Role Management
              </Typography>
            </div>
          </Stack>
        </div>
        <div className="user-buttoninput-right">
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <IconButton size="large">
              <RefreshIcon />
            </IconButton>
            <IconButton size="large">
              <UploadIcon />
            </IconButton>
            <IconButton size="large">
              <DownloadIcon />
            </IconButton>

            <Button
              variant="outlined"
              size="large"
              color="success"
              endIcon={<AddIcon />}
              onClick={handleClickOpenDialog}
            >
              Create Role
            </Button>

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 3 }}>
                  {editRoleManagement && (
                    <DialogTitle id="alert-dialog-title">Edit Role</DialogTitle>
                  )}

                  {!editRoleManagement && !viewAccessPermission && (
                    <DialogTitle id="alert-dialog-title">Add Role</DialogTitle>
                  )}

                  {viewAccessPermission && (
                    <DialogTitle id="alert-dialog-title">View Role</DialogTitle>
                  )}

                  <DialogContent>
                    <AppTextBox
                      name="role_name"
                      control={control}
                      label="Role Name"
                      helperText={errorAddRole?.role_name?.message}
                      error={Boolean(errorAddRole?.role_name)}
                      disabled={viewAccessPermission}
                      sx={{ mt: 3 }}
                    />

                    <FormControlLabel
                      label="Select All"
                      error
                      disabled={viewAccessPermission}
                      control={
                        <Checkbox
                          checked={
                            watch("access_permission").length ===
                            role_list.length
                          }
                          indeterminate={
                            watch("access_permission").length !==
                            role_list.length
                          }
                          onChange={handleChangeAll}
                        />
                      }
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", ml: 3 }}
                    >
                      {role_list.map((role) => {
                        return (
                          <FormControlLabel
                            key={role.id}
                            label={role.name}
                            value={role.value}
                            checked={watch("access_permission")?.includes(
                              role.value
                            )}
                            disabled={viewAccessPermission}
                            control={
                              <Checkbox {...register("access_permission")} />
                            }
                          />
                        );
                      })}
                      <FormHelperText sx={{ color: "red" }}>
                        {errorAddRole?.access_permission?.message}
                      </FormHelperText>
                    </Box>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ mx: 2 }}
                      onClick={handleCloseDialog}
                    >
                      {viewAccessPermission ? "close" : "cancel"}
                    </Button>

                    {!viewAccessPermission && (
                      <Button
                        variant="contained"
                        sx={{ mx: 2 }}
                        color="success"
                        type="onSubmit"
                      >
                        Create
                      </Button>
                    )}
                  </DialogActions>
                </Box>
              </form>
            </Dialog>
          </Stack>
        </div>
      </div>

      <div className="user-table">
        <Paper sx={{ boxShadow: 5 }}>
          <Toolbar sx={{ p: 1, position: "sticky", zIndex: 1 }}>
            <Tooltip title="Archived" sx={{ flex: "1 1 100%" }}>
              <FormControlLabel
                label="Archived"
                control={
                  <Checkbox
                    checked={archiveChecked}
                    onChange={handleArchiveCheckboxChange}
                  />
                }
              />
            </Tooltip>

            <TextField
              label="Search"
              id="outlined-size-normal"
              placeholder="Search"
              sx={{ width: "40%" }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSearchData(e.target.value);
                }
              }}
            />
          </Toolbar>

          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID No.</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Access Permission</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Date Created</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roleData?.data?.length === 0 && (
                  <TableRow hover role="checkbox">
                    <TableCell colSpan={12} sx={{ p: 18 }} align="center">
                      <h1>No Data</h1>
                    </TableCell>
                  </TableRow>
                )}

                {roleDataError && (
                  <TableRow hover role="checkbox">
                    <TableCell colSpan={12} sx={{ p: 18 }} align="center">
                      <h1>Something Went Wrong!!!</h1>
                    </TableCell>
                  </TableRow>
                )}

                {roleDataLoading ? (
                  <>
                    <TableRow hover role="checkbox">
                      <TableCell colSpan={12} sx={{ p: 20 }} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  roleData?.data?.length > 0 &&
                  roleData?.data?.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.role_name}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              setViewAccessPermission(true);
                              setOpenDialog(true);
                              setValue("role_name", row.role_name);
                              setValue(
                                "access_permission",
                                row.access_permission
                              );
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {row.is_active === 1 ? "active" : "deactivated"}
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.created_at).format("MMMM D, YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            id="composition-button"
                            aria-controls={
                              open ? "composition-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              handleToggle(e);
                              setAccessData(row);
                              setArchiveData(row);
                            }}
                          >
                            <MoreVertIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20]}
            a
            count={roleData?.total || 0}
            page={roleData?.current_page - 1 || 0}
            onPageChange={onPageChange}
            rowsPerPage={roleData?.per_page || 5}
            onRowsPerPageChange={onRowChange}
            sx={{ color: "black" }}
          />
        </Paper>
      </div>

      <div>
        <Menu
          // elevation={1}
          id="composition-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleToggle}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {archiveChecked ? (
            <MenuItem
              onClick={() => {
                setOpenModalArchive(true);
                handleClose();
              }}
            >
              <ReplyIcon />
              Restore
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                setOpenModalArchive(true);
                handleClose();
              }}
            >
              <ArchiveIcon />
              Archive
            </MenuItem>
          )}

          {!archiveChecked && (
            <MenuItem
              onClick={() => {
                setEditRoleManagement(true);
                setOpenDialog(true);
                setValue("role_name", accessData?.role_name);
                setValue("access_permission", accessData?.access_permission);
                setValue("id", accessData?.id);
                handleClose();
              }}
            >
              <ModeEditIcon />
              Edit
            </MenuItem>
          )}
        </Menu>

        <Modal open={openModalArchive} onClose={handleCloseModalArchive}>
          <Box
            sx={style}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Confirmation
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="h2"
              align="center"
            >
              {archiveChecked
                ? "Are you sure you want to RESTORE this data?"
                : "Are you sure you want to ARCHIVE this data?"}
            </Typography>

            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={handleCloseModalArchive}
                color="error"
              >
                No
              </Button>
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                color="success"
                onClick={handleArchive}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <div className="user-snackbar">
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            sx={{ width: "100%" }}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Role;
