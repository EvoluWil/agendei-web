import React, { useState } from 'react';
import * as yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem
} from '@mui/material';
import { useForm, FieldValues, useController } from 'react-hook-form';
import {
  TextFieldStyledProps,
  TextField
} from '../text-field/text-field.component';
import { TextFieldStyled } from '../text-field/text-field.styles';
import { yupResolver } from '@hookform/resolvers/yup';

interface SelectProps extends TextFieldStyledProps {
  options: { value: any; label: string }[];
  addButton?: boolean;
  newOptionDefaultValue?: string;
  required?: boolean;
  size?: 'medium' | 'small';
  watch?: (value: any) => void;
}

const validator = yup.object().shape({
  newOption: yup.string().required('required')
});

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  control,
  helperText = '',
  name,
  label,
  placeholder,
  options,
  newOptionDefaultValue,
  defaultValue,
  required,
  addButton,
  watch,
  size,
  ...rest
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newOption, setNewOption] = useState(newOptionDefaultValue || '');

  const {
    control: addControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validator)
  });

  const { field } = useController({
    name: name || '',
    control: control || undefined,
    defaultValue: defaultValue || ''
  });

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    reset();
  };

  const handleSubmitNewItem = (data: FieldValues) => {
    setNewOption(data.newOption);
    handleClose();
  };

  return (
    <>
      <TextFieldStyled
        variant="outlined"
        select
        error={!!helperText}
        label={label}
        helperText={!!helperText && helperText}
        name={field.name}
        value={field.value}
        onChange={event => {
          watch && watch(event.target.value);
          field.onChange(event);
        }}
        size="small"
        fullWidth
        sx={{ minWidth: '200px' }}
        {...rest}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        {addButton && !newOption && (
          <MenuItem>
            <Button
              variant="outlined"
              onClick={handleAddClick}
              fullWidth
              startIcon={<i className="fa fa-plus" />}
            >
              Adicionar opção
            </Button>
          </MenuItem>
        )}
        {addButton && newOption && (
          <MenuItem value={newOption}>{newOption}</MenuItem>
        )}
      </TextFieldStyled>
      {addButton && (
        <Dialog disableEscapeKeyDown open={openDialog} onClose={handleClose}>
          <DialogTitle>Adicionar opção</DialogTitle>
          <DialogContent>
            <Box p={2}>
              <TextField
                label="addOption"
                control={addControl}
                helperText={errors.newOption && errors.newOption.message}
                name="newOption"
                size="small"
                required
                defaultValue={newOptionDefaultValue || ''}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': { zIndex: 0 },
                  '.MuiOutlinedInput-input': { zIndex: 1 },
                  '.MuiInputLabel-root': { zIndex: 2 }
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit(handleSubmitNewItem)}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
