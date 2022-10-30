import {
  OutlinedTextFieldProps,
  InputAdornment,
  IconButton
} from '@mui/material';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextFieldStyled } from './text-field.styles';

type OutlinedTextFieldPropsEdit = Omit<OutlinedTextFieldProps, 'variant'>;
export interface TextFieldStyledProps extends OutlinedTextFieldPropsEdit {
  control?: Control;
  name: string;
  icon?: JSX.Element;
  watch?: (value: any) => void;
}
export const TextField: React.FC<TextFieldStyledProps> = ({
  control,
  helperText = '',
  defaultValue,
  label,
  name,
  icon,
  watch,
  onChange,
  value,
  type,
  ...rest
}) => {
  const [viewPassword, setViewPassword] = useState(false);

  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue || ''
  });

  return (
    <TextFieldStyled
      fullWidth
      size="small"
      variant={'outlined'}
      name={field.name}
      error={!!helperText}
      value={field.value}
      label={label}
      type={type === 'password' && !viewPassword ? 'password' : 'text'}
      helperText={!!helperText && helperText}
      onChange={field.onChange}
      InputProps={
        type === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={() => setViewPassword(prev => !prev)}
                    edge="end"
                    sx={{ color: '#B4B4C1' }}
                  >
                    {viewPassword ? (
                      <i className="material-symbols-outlined">
                        visibility_off
                      </i>
                    ) : (
                      <i className="material-symbols-outlined">visibility</i>
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }
          : !!icon
          ? {
              endAdornment: (
                <InputAdornment position="end">{icon}</InputAdornment>
              )
            }
          : {}
      }
      {...rest}
    />
  );
};
