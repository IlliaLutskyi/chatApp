import { Box, InputLabel, OutlinedInput, Typography } from "@mui/material";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
type props<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  error?: string;
  field?: Path<T>;
  label?: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  sx?: object;
};
const Input = <T extends FieldValues>({
  className = "",
  error = "",
  field,
  type = "text",
  label = "",
  placeholder = "",
  register,
  labelClassName = "",
  id,
  onChange,
  defaultValue,
  sx,
}: props<T>) => {
  if (type === "file" || !field || !register) {
    return (
      <Box className="flex flex-col gap-1">
        <InputLabel htmlFor={id} className={labelClassName}>
          {label ? label[0].toUpperCase() + label.slice(1) : ""}
        </InputLabel>
        <OutlinedInput
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          className={className}
          type={type}
          defaultValue={defaultValue ? defaultValue : ""}
          sx={{ ...sx }}
        />
        <Typography className="text-sm text-red-600">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box className="flex flex-col gap-1">
      <InputLabel htmlFor={id} className={labelClassName}>
        {label ? label[0].toUpperCase() + label.slice(1) : ""}
      </InputLabel>
      <OutlinedInput
        {...register(field)}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        className={className}
        type={type}
        defaultValue={defaultValue ? defaultValue : ""}
        sx={{ ...sx }}
      />
      <Typography className="text-sm text-red-600">{error}</Typography>
    </Box>
  );
};

export default Input;
