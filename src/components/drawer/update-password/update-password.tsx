import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { TextField } from '../../ui/inputs/text-field/text-field.component';
import { Button } from '../../ui/button/button.component';
import { BaseDrawer } from '../base-drawer/base-drawer.component';
import { useState } from 'react';
import { useAuth } from '../../../contexts/auth.context';
import {
  NestError,
  NestSuccess
} from '../../../utils/formatters/format-nest.util';

const updatePasswordValidation = yup.object().shape({
  oldPassword: yup.string().required('Senha atual é obrigatória'),
  password: yup.string().required('Nova senha é obrigatória'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
});

interface UpdatePasswordProps {
  open: boolean;
  setOpen: () => void;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  open,
  setOpen
}) => {
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(updatePasswordValidation)
  });

  const handleUpdatePassword = async (data: FieldValues) => {
    try {
      setLoading(true);
      await updatePassword(data);
      NestSuccess('Senha atualizada com sucesso');
      setLoading(false);
    } catch (err) {
      NestError(err);
      setLoading(false);
    }
  };

  return (
    <BaseDrawer
      open={open}
      setOpen={setOpen}
      width={30}
      content={
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="100%"
          maxWidth={500}
          gap={2}
          mt={2}
        >
          <img
            src="/images/logo.png"
            alt="Beach House"
            width="200px"
            style={{ marginRight: 'auto' }}
          />

          <Typography mb={2}>Alteração de senha!</Typography>
          <TextField
            label="Senha atual"
            name={'oldPassword'}
            type="password"
            control={control}
            helperText={errors?.oldPassword?.message}
          />
          <TextField
            label="Nova senha"
            name={'password'}
            type="password"
            control={control}
            helperText={errors?.password?.message}
          />
          <TextField
            label="Confirme a senha"
            name={'passwordConfirmation'}
            type="password"
            control={control}
            helperText={errors?.passwordConfirmation?.message}
          />
          <Box width="100%">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleUpdatePassword)}
              type="submit"
              loading={loading}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      }
    />
  );
};
