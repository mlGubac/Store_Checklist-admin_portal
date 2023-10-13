import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const AppTextBox = ({
  name,
  control,
  defaultValue,
  label,
  id,
  disabled,
  error,
  helperText,
  sx,
  fullWidth,
}) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            id={id}
            label={label}
            variant="outlined"
            {...field}
            disabled={disabled}
            error={error}
            helperText={helperText}
            sx={sx}
            fullWidth={fullWidth}
          />
        )}
      />
    </FormControl>
  );
};

export default AppTextBox;
