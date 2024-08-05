// components/PasswordField.tsx
import React, { useState, ChangeEvent } from 'react';
import { IconButton, InputAdornment, Tooltip, TextField } from '@mui/material';
import { Visibility, VisibilityOff, Info } from '@mui/icons-material';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hideInfoIcon?: boolean;
  required?: boolean;
  [x: string]: any; // Allows additional props
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, value, onChange, required,hideInfoIcon = false, error, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      fullWidth
      required={required}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
           {!hideInfoIcon && <Tooltip title="Password must be at least 8 characters long and contain at least one letter, one number, and one special character.">
              <IconButton edge="end" aria-label="password requirements" style={{ marginRight: 8 }}>
                <Info fontSize="small" />
              </IconButton>
            </Tooltip>}
            <IconButton
              edge="end"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={handleClickShowPassword}
              style={{ marginLeft: 8 }}
            >
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordField;
