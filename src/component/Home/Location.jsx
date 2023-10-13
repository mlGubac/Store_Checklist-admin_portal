import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

//Icon
import SyncIcon from "@mui/icons-material/Sync";
import AutoComplete from "../sample/AutoComplete";

const Location = () => {
  //useState
  const [archiveChecked, setArchiveChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  //Checkbox
  const handleArchiveCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setArchiveChecked(isChecked);
  };

  //Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                Location
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
            <Button variant="outlined" size="large" startIcon={<SyncIcon />}>
              Sync Data
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
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     onSearchData(e.target.value);
              //   }
              // }}
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
                  <TableCell align="center">ID No.</TableCell>
                  <TableCell>Location Code</TableCell>
                  <TableCell>Location Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date Updated</TableCell>
                </TableRow>
              </TableHead>

              <TableBody hover role="checkbox" tabIndex={-1}>
                <TableRow hover role="checkbox">
                  <TableCell align="center">1</TableCell>
                  <TableCell>Sample</TableCell>
                  <TableCell>Sample</TableCell>
                  <TableCell>
                    <Button onClick={handleClickOpen}>View</Button>
                  </TableCell>
                  <TableCell>Sample</TableCell>
                  <TableCell>Sample</TableCell>
                </TableRow>
                {/* );
                  })
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ color: "black" }}
          />
        </Paper>
      </div>

      <div className="user-dialog">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"View Departments"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="filled-read-only-input"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Location;
