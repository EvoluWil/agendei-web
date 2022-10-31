import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UpdatePassword } from '../../components/drawer/update-password/update-password';
import { Button } from '../../components/ui/button/button.component';
import Dialog from '../../components/ui/dialog/dialog.component';
import { EmptyData } from '../../components/ui/empty-data/empty-data.component';
import { EventCard } from '../../components/ui/event-card/event-card.component';
import { TextField } from '../../components/ui/inputs/text-field/text-field.component';
import { ReservationCard } from '../../components/ui/reservation-card/reservation-card';
import { useAuth } from '../../contexts/auth.context';
import { useUser } from '../../contexts/user.context';
import { User } from '../../data/models/user.model';
import { UserService } from '../../data/services/user.service';
import { formatEventsToCalendar } from '../../utils/formatters/format-events-calendar.util';
import {
  NestError,
  NestSuccess
} from '../../utils/formatters/format-nest.util';
import { setTokenSsr } from '../../utils/functions/set-token-ssr.util';

const userDetail = yup.object().shape({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail com formato invalido'),
  name: yup
    .string()
    .required('Nome é obrigatório')
    .test(`test-full-name`, function (value) {
      const { path, createError } = this;
      const [firstName, lastName] = String(value).split(' ');
      if (firstName && lastName) {
        return true;
      }
      return createError({
        path,
        message: 'Nome completo deve possuir nome e sobrenome'
      });
    })
});

const query: Query = {
  select: 'name email',
  populate: [
    {
      path: 'ownerEvents',
      select:
        'name startDate endDate limit value reservations slug active picture'
    },
    {
      path: 'reservations',
      select: 'status updatedAt',
      populate: [
        {
          path: 'event',
          select: 'name startDate endDate value active picture slug'
        }
      ]
    }
  ]
};

interface UserDetailProps {
  user: User;
}

const Profile: React.FC<UserDetailProps> = ({ user }) => {
  const [hasEdit, setHasEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [updatePasswordDrawer, setUpdatePasswordDrawer] = useState(false);

  const { updateUser, deleteUser } = useUser();
  const { push } = useRouter();
  const { signOut } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userDetail)
  });

  const handleUpdateUser = async (data: FieldValues) => {
    try {
      setLoading(true);
      await updateUser(user?.id || '', data);
      setLoading(false);
      NestSuccess('Atualizado com sucesso');
    } catch (err) {
      setLoading(false);
      NestError(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await deleteUser(user?.id || '');
      NestSuccess('Usuário removido com sucesso');
      signOut();
      push('/events');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      NestError(err);
    }
  };

  const handleCancelUpdateUser = async () => {
    reset({
      name: user?.name,
      email: user?.email
    });
  };

  return (
    <>
      <Head>
        <title>Minha Conta | Agendei</title>
      </Head>

      <UpdatePassword
        open={updatePasswordDrawer}
        setOpen={() => setUpdatePasswordDrawer(false)}
      />
      <Dialog
        title={'Apagar conta?'}
        message={
          <>
            <Typography>Tem certeza que deseja APAGAR sua conta? </Typography>
            <Typography>
              Todas as reservas e eventos vinculados a este usuário também serão
              apagados
            </Typography>
            <Typography variant="caption">
              Esta ação não poderá ser desfeita
            </Typography>
          </>
        }
        type={'question'}
        open={deleteUserDialog}
        isLoading={loading}
        setOpen={() => setDeleteUserDialog(false)}
        result={res => res && handleDeleteUser()}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ md: 'row', xs: 'column' }}
          width="100%"
          mb={4}
        >
          <Typography variant="h4" color="primary.main" component="h2">
            Minha conta
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection={{ md: 'row', xs: 'column' }}
            mt={{ md: 0, xs: 2 }}
            gap={1}
            width={'100%'}
            maxWidth={400}
          >
            <Button
              onClick={() => setUpdatePasswordDrawer(true)}
              color="primary"
            >
              Alterar senha
            </Button>
            <Button
              onClick={() => setDeleteUserDialog(true)}
              variant="outlined"
              color="error"
            >
              Apagar conta
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          bgcolor={theme => theme.palette.grey[100]}
          borderRadius={4}
          p={2}
        >
          {!hasEdit ? (
            <Button
              variant="text"
              color="primary"
              onClick={() => setHasEdit(prev => !prev)}
              type="submit"
              sx={{ ml: 'auto', width: 'auto' }}
            >
              <i className="fa fa-pencil" style={{ marginRight: '4px' }} />
              Editar
            </Button>
          ) : (
            <Box display="flex" ml="auto" mr={1}>
              <Button
                variant="text"
                color="success"
                onClick={handleSubmit(handleUpdateUser)}
                loading={loading}
                startIcon={
                  <i className="fa fa-check" style={{ marginRight: '4px' }} />
                }
              >
                Salvar
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={handleCancelUpdateUser}
                type="submit"
              >
                <i className="fa fa-trash" style={{ marginRight: '4px' }} />
                Cancelar
              </Button>
            </Box>
          )}
          <Grid
            container
            spacing={0}
            sx={{ boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.1)' }}
            borderRadius={4}
            bgcolor={theme => theme.palette.grey[50]}
            p={2}
            zIndex={1}
          >
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <TextField
                label="Nome do evento"
                name="name"
                defaultValue={user?.name}
                control={control}
                helperText={errors?.name?.message}
              />
              <TextField
                disabled
                label="E-mail"
                defaultValue={user?.email}
                name="email"
                type="email"
                control={control}
                helperText={errors?.email?.message}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          bgcolor={theme => theme.palette.grey[100]}
          borderRadius={4}
          p={2}
          my={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ md: 'row', xs: 'column' }}
          >
            <Typography color="primary" fontWeight="bold" variant="h5">
              Meus Eventos
            </Typography>
          </Box>
          <Grid container spacing={4} my={2}>
            {user?.ownerEvents?.length ? (
              formatEventsToCalendar(user.ownerEvents).map(event => (
                <Grid key={event.resource.id} item xs={12} md={6}>
                  <EventCard event={event} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <EmptyData message="Que pena! Você ainda não possui nenhum evento." />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          bgcolor={theme => theme.palette.grey[100]}
          borderRadius={4}
          p={2}
        >
          <Typography color="primary" fontWeight="bold" variant="h5">
            Minhas Reservas
          </Typography>
          <Grid container spacing={4} my={2}>
            {user?.reservations?.length ? (
              user.reservations.map(reservation => (
                <Grid key={reservation.id} item xs={12} md={6}>
                  <ReservationCard reservation={reservation} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <EmptyData message="Que pena! Você ainda não possui nenhuma reserva." />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  try {
    setTokenSsr(req, res);
    const user = await UserService.getUser(`${params?.id}`, query);
    return {
      props: { user }
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/events',
        permanent: false
      }
    };
  }
};
