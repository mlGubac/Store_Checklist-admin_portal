import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  FormControl,
  Button,
  Stack,
  Alert,
  Snackbar,
  TextField,
} from "@mui/material";

import { useUserCreate } from "../../hooks/UserController";
import AppTextBox from "../sample/AppTextBox";
import AutoComplete from "../sample/AutoComplete";
import { useRoleGet } from "../../hooks/useRoleManagement";
import { useSedarGet } from "../../hooks/useSedar";

const CreateUser = ({ setIsDrawerOpen }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [idNoError, setIdNoError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  // Hook
  const { data: sedarData = [] } = useSedarGet();

  const { mutate: createUserMutation } = useUserCreate();

  const { data: roleData } = useRoleGet();

  // Create User + Cancel Button
  const validationSchema = yup.object({
    employeeId: yup.object().required("Employee Id is Required"),
    username: yup.string().required("Username is Required"),
    roleId: yup.object().required("Role is Required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employeeId: null,
      first_name: "",
      last_name: "",
      department_name: "",
      location_name: "",
      status: "active",
      roleId: null,
    },
  });

  const onSubmit = (data) => {
    const obj = {
      personal_info: {
        id_prefix: data.prefix_id,
        id_no: data.id_no,
        first: data.first,
        middle: data.middle,
        last: data.last,
        sex: data.sex,
        username: data.username,
      },
      role_id: data.roleId.id,
      location: data.location,
      department: data.department,
      company: data.company,
      status: "active",
    };

    createUserMutation(obj, {
      onSuccess: () => {
        setOpenSnackBar(true);
        setUserCreated(true);
        setIsDrawerOpen(false);
      },
      onError: (error) => {
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data.errors;

          if (errorData["personal_info.id_no"]) {
            setIdNoError(errorData["personal_info.id_no"][0]);
            setOpenSnackBar(true);
          } else {
            setIdNoError(null);
          }

          if (errorData["personal_info.username"]) {
            setUsernameError(errorData["personal_info.username"][0]);
            setOpenSnackBar(true);
          } else {
            setUsernameError(null);
          }
        }
      },
    });
  };

  useEffect(() => {
    if (watch("employeeId")) {
      const employee = watch("employeeId");

      // Set the values for AppTextBox components using setValue
      setValue("prefix_id", employee.general_info.prefix_id);
      setValue("id_no", employee.general_info.id_number);
      setValue("first", employee.general_info.first_name);
      setValue("middle", employee.general_info.middle_name);
      setValue("last", employee.general_info.last_name);
      setValue("sex", employee.general_info.gender);
      setValue("location", employee.unit_info.location_name);
      setValue("department", employee.unit_info.department_name);
      setValue("company", employee.unit_info.company_name);
      setValue(
        "username",
        `${employee.general_info.first_name
          .split(" ")
          .map((item) => item[0])
          .join("")}${employee.general_info.last_name}`.toLowerCase()
      );
    }
  }, [watch("employeeId")]);

  //SnackBar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    setUserCreated(false);
  };

  // console.log(roleData?.data);
  return (
    <div className="user-create-sidenav-main">
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <AutoComplete
            control={control}
            name={"employeeId"}
            options={sedarData}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            getOptionLabel={(option) => option?.general_info?.full_id_number}
            isOptionEqualToValue={(option, value) =>
              option?.general_info?.full_id_number ===
              value?.general_info?.full_id_number
            }
            renderInput={(params) => (
              <TextField
                name="employeeId"
                {...params}
                label="Employee Id"
                helperText={errors?.employeeId?.message}
                error={Boolean(errors?.employeeId)}
                sx={{ mb: 2 }}
              />
            )}
          />
        </FormControl>

        <AppTextBox
          name="prefix_id"
          control={control}
          label="ID Prefix"
          disabled={true}
        />

        <AppTextBox
          name="id_no"
          control={control}
          label="ID Number"
          disabled={true}
        />

        <AppTextBox
          name="first"
          control={control}
          label="First Name"
          disabled={true}
        />

        <AppTextBox
          name="last"
          control={control}
          label="Last Name"
          disabled={true}
        />

        <AppTextBox name="sex" control={control} label="Sex" disabled={true} />

        <AppTextBox
          name="location"
          control={control}
          label="Location Name"
          disabled={true}
        />

        <AppTextBox
          name="department"
          control={control}
          label="Department Name"
          disabled={true}
        />

        <AppTextBox
          name="company"
          control={control}
          label="Company Name"
          disabled={true}
        />

        <AppTextBox
          name="username"
          control={control}
          label="Username"
          disabled={false}
          helperText={errors?.username?.message}
          error={Boolean(errors?.username)}
        />

        <FormControl fullWidth>
          <AutoComplete
            control={control}
            name={"roleId"}
            options={roleData?.data || []}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            getOptionLabel={(option) => option?.role_name}
            isOptionEqualToValue={(option, value) =>
              option?.role_id === value?.role_id
            }
            renderInput={(params) => (
              <TextField
                name="roleId"
                {...params}
                label="Role"
                helperText={errors?.role?.message}
                error={Boolean(errors?.role)}
                sx={{ mb: 2 }}
              />
            )}
          />
        </FormControl>

        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button type="submit" variant="outlined" color="success">
            Create User
          </Button>
        </Stack>
      </form>

      <div className="create-user-snackbar">
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={userCreated ? "success" : "error"}
          >
            {userCreated
              ? "User has been successfully created."
              : (idNoError && <div>{idNoError}</div>) ||
                (usernameError && <div>{usernameError}</div>)}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default CreateUser;
