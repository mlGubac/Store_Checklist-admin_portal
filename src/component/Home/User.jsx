import React, {useContext} from 'react'
import { DrawerContext } from '../../context/DrawerContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//Icon
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

// Table
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, },
  { field: 'firstName', headerName: 'FIRST NAME', width: 150 },
  { field: 'lastName', headerName: 'LASTNAME', width: 150 },
  {
    field: 'userName',
    headerName: 'USERNAME',
    width: 150,
    valueGetter: (params) =>
      `${(params.row.firstName[0] || '').toLowerCase()}${(params.row.lastName || '').toLowerCase()}`,
  },
  {
    field: 'password',
    headerName: 'PASSWORD',
    width: 150,
    valueGetter: (params) =>
      `${(params.row.firstName[0] || '').toLowerCase()}${(params.row.lastName || '').toLowerCase()}${"1234"}`,
  },
  { field: 'role', headerName: 'ROLE', width: 150 },
  { field: 'department', headerName: 'DEPARTMENT', width: 150 },
  { field: 'subUnit', headerName: 'SUB UNIT', width: 150 },
  { field: 'location', headerName: 'LOCATION', width: 150 },
  { field: 'division', headerName: 'DIVISION', width: 150 },
  { field: 'divisionCategory', headerName: 'DIVISION CATEGORY', width: 150 },
  { field: 'company', headerName: 'COMPANY', width: 150 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 4, lastName: 'Stark', firstName: 'Arya', role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 6, lastName: 'Melisandre', firstName: 'Mary',role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara',role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 8, lastName: 'Frances', firstName: 'Rossini',role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey',role: 'Driver', department: 'MANAGEMENT INFORMATION SYSTEM', subUnit: 'SYSTEM APPLICATION AND AUTOMATION DEVELOPMENT', location:'HEAD OFFICE', division: 'OFFICE', divisionCategory: 'SERVICE GROUP', company: 'RDF CORPORATE SERVICES'},
];


const User = () => {

  const {setIsOpen, isOpen} = useContext(DrawerContext);

  const onClickButton = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='user-container'>
      <div className='user-buttoninput'>
        <div className='user-buttoninput-left'>

          <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <FormControl sx={{ m: 1, minWidth: 150 }} >
              <InputLabel id="user-searchby-label">Search by</InputLabel>
              <Select
                labelId="user-searchby-label"
                id="user-select"
                label="Search by"
                size="medium"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="id">Employee Id</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="department">Department</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Search" id="outlined-size-normal" placeholder='Search' />
            <Button variant="outlined" size="large">Search</Button>
          </Stack>
        
        </div>
        <div className='user-buttoninput-right'>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <IconButton size="large">
              <RefreshIcon/>
            </IconButton>
            <IconButton size="large">
              <UploadIcon/>
            </IconButton>
            <IconButton size="large">
              <DownloadIcon/>
            </IconButton>
            <Button variant="outlined" size="large" color="success" onClick={onClickButton}>
              Create <AddIcon/>
            </Button>
          </Stack>
        </div>
      </div>

      <div div className='user-table'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}

        />
      </div>
    </div>
  )
}

export default User