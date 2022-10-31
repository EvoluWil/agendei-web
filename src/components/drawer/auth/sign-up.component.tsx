import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { TextField } from '../../ui/inputs/text-field/text-field.component';
import { Button } from '../../ui/button/button.component';

const SignUpValidation = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .matches(/^[a-zA-Z\s]/, 'Nome invalido')
    .matches(/^[a-zA-Z\s]+\s+[a-zA-Z]/, 'Nome precisa ter sobrenome'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
});

interface SignUpProps {
  onSubmit: (data: FieldValues) => void;
  loading: boolean;
  onChangeMode: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({
  onSubmit,
  loading,
  onChangeMode
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignUpValidation)
  });

  const handleSignIn = async (data: FieldValues) => {
    delete data.passwordConfirmation;
    onSubmit(data);
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

      <Typography mb={2}>Cadastre-se é de graça!</Typography>
      <TextField
        label="E-mail"
        name="email"
        type="email"
        control={control}
        helperText={errors?.email?.message}
      />
      <TextField
        label="Nome"
        name="name"
        control={control}
        helperText={errors?.name?.message}
      />
      <TextField
        label="Senha"
        name={'password'}
        type="password"
        control={control}
        helperText={errors?.password?.message}
      />
      <TextField
        label="Confirma a Senha"
        name={'passwordConfirmation'}
        type="password"
        control={control}
        helperText={errors?.passwordConfirmation?.message}
      />
      <Box width="100%">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleSignIn)}
          type="submit"
          loading={loading}
        >
          Cadastrar
        </Button>
        <Typography
          variant="caption"
          display="flex"
          mt={0.5}
          justifyContent="flex-end"
        >
          Já possui uma conta?{' '}
          <Button
            onClick={handleChangeMode}
            variant="text"
            sx={{
              width: 'auto',
              py: 0,
              fontSize: theme => theme.typography.caption
            }}
          >
            Entrar
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};
