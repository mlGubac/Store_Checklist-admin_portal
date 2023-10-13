import { Controller } from "react-hook-form";
import {
  Autocomplete as MuiAutocomplete,
  createFilterOptions,
} from "@mui/material";

const AutoComplete = ({
  disabled,
  name,
  control,
  error,
  helperText,
  className,
  loading,
  fullWidth,
  ...autocomplete
}) => {
  const { multiple } = autocomplete;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    const filteredOptions = defaultFilterOptions(options, state).slice(0, 100);

    return filteredOptions;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = multiple ? [] : null, onChange } = field;

        return (
          <MuiAutocomplete
            loading={loading}
            autoFocus={false}
            disabled={disabled}
            {...autocomplete}
            filterOptions={filterOptions}
            className="select"
            error={error}
            helperText={helperText}
            value={value}
            disablePortal={false}
            onChange={(_, value) => onChange(value)}
            fullWidth={fullWidth}
          />
        );
      }}
    />
  );
};

export default AutoComplete;
