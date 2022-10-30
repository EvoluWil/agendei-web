import { Stack } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers/locales';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { useController } from 'react-hook-form';
import { TextFieldStyledProps } from '../text-field/text-field.component';
import { TextFieldStyled } from '../text-field/text-field.styles';

interface DatePickerProps extends TextFieldStyledProps {
  maxDateTime?: Date;
  minDateTime?: Date;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  maxDateTime,
  minDateTime,
  defaultValue,
  control,
  helperText,
  name,
  label,
  placeholder,
  size = 'small',
  value,
  onChange,
  ...rest
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue || null
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Stack sx={{ width: '100%' }}>
        <DateTimePicker
          maxDateTime={maxDateTime}
          minDateTime={minDateTime}
          label={label}
          inputFormat={'dd/MM/yyyy hh:mm'}
          value={field.value}
          onChange={field.onChange}
          renderInput={params => (
            <TextFieldStyled
              size={size}
              {...rest}
              {...params}
              error={!!helperText}
              helperText={helperText}
              variant={'outlined'}
              name={field.name}
              value={field.value}
              fullWidth
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};
