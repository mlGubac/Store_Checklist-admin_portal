import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CreateUser from "./CreateUser";

//Icon
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyIcon from "@mui/icons-material/Reply";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
  useUserGet,
  useUserResetPassword,
  useUserArchive,
} from "../../hooks/UserController";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Drawer,
  FormControlLabel,
  Menu,
  MenuList,
  Modal,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

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

const drawerWidth = 420;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const User = () => {
  //useState
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [archiveData, setArchiveData] = useState(null);
  const [openModalArchive, setOpenModalArchive] = useState(false);

  const [resetData, setResetData] = useState(null);
  const [openModalReset, setOpenModalReset] = useState(false);

  const [archiveChecked, setArchiveChecked] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  //hook
  const {
    data: userData,
    isLoading: dataLoading,
    isError: userDataError,
    onSearchData,
    onPageChange,
    onRowChange,
    onArchiveDeactivated,
    onArchiveActive,
  } = useUserGet();

  const {
    mutate: userArchive,
    data: archivesData,
    isSuccess: archiveSuccess,
    isError: archiveIsError,
    error: archiveError,
  } = useUserArchive();

  const {
    mutate: userReset,
    data: resetsData,
    isSuccess: resetSuccess,
  } = useUserResetPassword();

  // Create User
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const createUser = ({ anchor }) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
        padding: 2,
      }}
      role="presentation"
    >
      <CreateUser setIsDrawerOpen={setIsDrawerOpen} />
    </Box>
  );

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
      userArchive(obj);
    } else {
      const obj = {
        id: archiveData.id,
        status: false,
      };
      userArchive(obj);
    }
  };

  useEffect(() => {
    if (archiveSuccess) {
      setOpenModalArchive(false);
      setSnackbarMessage(archivesData?.data?.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }

    if (archiveIsError) {
      setOpenModalArchive(false);
      setSnackbarMessage(archiveError?.response?.data?.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [archiveSuccess, archiveIsError]);

  //Modal Reset
  const handleCloseModalReset = () => setOpenModalReset(false);

  const handleReset = () => {
    userReset(resetData);
  };

  useEffect(() => {
    if (resetSuccess) {
      setOpenModalReset(false);
      setSnackbarMessage(resetsData?.data?.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
    console.log(resetsData?.data?.message);
  }, [resetSuccess]);

  //Checkbox

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
  const handleSnackBar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

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
                User Management
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
              // onClick={onClickButton}
              onClick={() => setIsDrawerOpen(true)}
            >
              Create User
            </Button>
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

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400, minHeight: 400 }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">ID Prefix</TableCell>
                  <TableCell align="right">ID Number</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Middle Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">User Name</TableCell>
                  <TableCell align="right">Sex</TableCell>
                  <TableCell align="right">Location Name</TableCell>
                  <TableCell align="right">Department Name</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userData?.data?.length === 0 && (
                  <TableRow hover role="checkbox">
                    <TableCell colSpan={12} sx={{ p: 18 }} align="center">
                      <h1>No Data</h1>
                    </TableCell>
                  </TableRow>
                )}

                {userDataError && (
                  <TableRow hover role="checkbox">
                    <TableCell colSpan={12} sx={{ p: 18 }} align="center">
                      <h1>Something Went Wrong!!!</h1>
                    </TableCell>
                  </TableRow>
                )}

                {dataLoading ? (
                  <>
                    <TableRow hover role="checkbox">
                      <TableCell colSpan={12} sx={{ p: 20 }} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  userData?.data?.length > 0 &&
                  userData?.data?.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell>{row.id_prefix}</TableCell>
                        <TableCell>{row.id_no}</TableCell>
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.middle_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.sex}</TableCell>
                        <TableCell>{row.location_name}</TableCell>
                        <TableCell>{row.department_name}</TableCell>
                        <TableCell>{row.company_name}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            id="composition-button"
                            aria-controls={
                              open ? "composition-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              handleToggle(e);
                              setArchiveData(row);
                              setResetData(row);
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
            count={userData?.total || 0}
            page={userData?.current_page - 1 || 0}
            onPageChange={onPageChange}
            rowsPerPage={userData?.per_page || 5}
            onRowsPerPageChange={onRowChange}
            sx={{ color: "black" }}
          />
        </Paper>
      </div>

      <div className="user-menu">
        <Menu
          id="composition-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
                setOpenModalReset(true);
                handleClose();
              }}
            >
              <RefreshIcon />
              Reset
            </MenuItem>
          )}
        </Menu>
      </div>

      <div className="user-modal-archive">
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

      <div className="user-modal-reset">
        <Modal
          open={openModalReset}
          onClose={handleCloseModalReset}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
              Are you sure you want to RESET this user password?
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={handleCloseModalReset}
                color="error"
              >
                No
              </Button>
              <Button
                variant="outlined"
                sx={{ mx: 2 }}
                color="success"
                onClick={handleReset}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          anchor="right"
          open={isDrawerOpen}
          ModalProps={{
            keepMounted: false,
          }}
        >
          <DrawerHeader>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h4" sx={{ p: 2, alignItems: "center" }}>
              Create User
            </Typography>
          </DrawerHeader>

          {createUser("right", setIsDrawerOpen)}
        </Drawer>
      </div>

      <div className="user-snackbar">
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default User;
