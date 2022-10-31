import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { TextField } from '../../ui/inputs/text-field/text-field.component';
import { Button } from '../../ui/button/button.component';

const SignInValidation = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória')
});

interface SignInProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  onChangeMode: () => void;
}

export const SignIn: React.FC<SignInProps> = ({
  onSubmit,
  loading,
  onChangeMode
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInValidation)
  });

  const handleSignIn = async ({ email, password }: FieldValues) => {
    onSubmit(email, password);
  };

  const handleChangeMode = () => {
    onChangeMode();
  };

  return (
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

      <Typography mb={2}>
        Faça login para ter as todas as funcionalidades
      </Typography>
      <TextField
        label="E-mail"
        name="email"
        type="email"
        control={control}
        helperText={errors?.email?.message}
      />
      <TextField
        label="Senha"
        name={'password'}
        type="password"
        control={control}
        helperText={errors?.password?.message}
      />
      <Box width="100%">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleSignIn)}
          type="submit"
          loading={loading}
        >
          Confirmar
        </Button>
        <Typography
          variant="caption"
          display="flex"
          mt={0.5}
          justifyContent="flex-end"
        >
          Ainda não tem uma conta?{' '}
          <Button
            onClick={handleChangeMode}
            variant="text"
            sx={{
              width: 'auto',
              py: 0,
              fontSize: theme => theme.typography.caption
            }}
          >
            Cadastre-se
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};
