import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface CustomTextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any; // Allows additional props
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, type = 'text', value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;
