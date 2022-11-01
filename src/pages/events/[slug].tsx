import {
  Avatar,
  Box,
  Grid,
  Typography,
  Tooltip,
  Fab,
  IconButton
} from '@mui/material';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { EventService } from '../../data/services/event.service';
import { setTokenSsr } from '../../utils/functions/set-token-ssr.util';
import { CreateEventDrawer } from '../../components/drawer/create-event/create-event.component';
import { useState } from 'react';
import { IEvent } from '../../data/models/event.model';
import { Button } from '../../components/ui/button/button.component';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { capitalize } from '../../utils/formatters/capitalize.util';
import { formatCurrency } from '../../utils/formatters/currency.util';
import { useAuth } from '../../contexts/auth.context';
import { useEvent } from '../../contexts/event.context';
import { useReservation } from '../../contexts/reservation.context';
import { ReservationRequestDrawer } from '../../components/drawer/reservation-requests/reservation-requests.component';
import { ReservationStatusDrawer } from '../../components/drawer/reservation-status/reservation-status.component';
import { useRouter } from 'next/router';
import Dialog from '../../components/ui/dialog/dialog.component';
import {
  NestError,
  NestSuccess
} from '../../utils/formatters/format-nest.util';

const query: Query = {
  select:
    'name reservations picture startDate endDate description limit value createdAt address active slug',
  populate: [
    { path: 'owner', select: 'name' },
    {
      path: 'reservations',
      select: 'user status'
    }
  ]
};

interface EventDetailProps {
  data: IEvent;
}
const EventDetail: React.FC<EventDetailProps> = ({ data }) => {
  const [event, setEvent] = useState(data);
  const [loading, setLoading] = useState(false);

  const [cancelEventDialog, setCancelEventDialog] = useState(false);
  const [updateEventOpen, setUpdateEventOpen] = useState(false);
  const [updateRequestsOpen, setUpdateRequestsOpen] = useState(false);
  const [requestsStatus, setRequestsStatus] = useState('');

  const { push } = useRouter();
  const { user } = useAuth();
  const { getEvent, deleteEvent } = useEvent();
  const { createReservation } = useReservation();

  const handleRequestAccess = async () => {
    try {
      setLoading(true);
      await createReservation(event.id, user?.id || '');
      NestSuccess('Solicitação enviada com sucesso');
      setLoading(false);
    } catch (err) {
      NestError(err);
      setLoading(false);
    }
  };

  const onEditEvent = async () => {
    try {
      const updatedEvent = await getEvent(event.slug, query);
      setEvent(updatedEvent);
    } catch (err) {
      NestError(err);
    }
  };

  const handleCancelEvent = async () => {
    try {
      setLoading(true);
      await deleteEvent(event.id);
      push('/events');
      NestSuccess('Evento cancelado com sucesso');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      NestError(err);
    }
  };

  return (
    <>
      <Head>
        <title>{capitalize(event.name)} | Agendei</title>
      </Head>
      {event?.owner?.id === user?.id && event.active && (
        <>
          <Tooltip title="Editar evento">
            <Fab
              color="primary"
              onClick={() => setUpdateEventOpen(true)}
              sx={{
                position: 'fixed',
                right: 0,
                borderRadius: '20px 0 0 20px',
                top: '90px'
              }}
            >
              <i className="material-icons" style={{ fontSize: '32px' }}>
                edit_calendar
              </i>
            </Fab>
          </Tooltip>
          <Tooltip title="Gerenciar reservas">
            <Fab
              color="primary"
              onClick={() => setUpdateRequestsOpen(true)}
              sx={{
                position: 'fixed',
                right: 0,
                borderRadius: '20px 0 0 20px',
                top: '160px'
              }}
            >
              <i className="material-icons" style={{ fontSize: '32px' }}>
                event_available
              </i>
            </Fab>
          </Tooltip>
          <Tooltip title="Cancelar evento">
            <Fab
              color="error"
              onClick={() => setCancelEventDialog(true)}
              sx={{
                position: 'fixed',
                right: 0,
                borderRadius: '20px 0 0 20px',
                top: '230px'
              }}
            >
              <i className="material-icons" style={{ fontSize: '32px' }}>
                cancel
              </i>
            </Fab>
          </Tooltip>
        </>
      )}
      <ReservationStatusDrawer
        open={!!requestsStatus}
        setOpen={() => setRequestsStatus('')}
        onSubmit={onEditEvent}
        reservationId={`${requestsStatus}`}
      />
      <CreateEventDrawer
        open={updateEventOpen}
        setOpen={() => setUpdateEventOpen(false)}
        onSubmit={onEditEvent}
        event={event}
      />
      <ReservationRequestDrawer
        open={updateRequestsOpen}
        setOpen={() => setUpdateRequestsOpen(false)}
        onSubmit={onEditEvent}
        eventId={event.id}
      />
      <Dialog
        title="Cancelar Evento"
        message={
          <>
            <Typography>
              Tem certeza que deseja CANCELAR este evento?{' '}
            </Typography>
            <Typography variant="caption">
              Esta ação não poderá ser desfeita
            </Typography>
          </>
        }
        type={'question'}
        isLoading={loading}
        open={cancelEventDialog}
        setOpen={() => setCancelEventDialog(false)}
        result={res => res && handleCancelEvent()}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ md: 'row', xs: 'column' }}
        mb={4}
      >
        <Typography
          variant="h4"
          color="primary.main"
          component="h2"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <Tooltip title="Voltar">
            <IconButton
              onClick={() => push('/events')}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { opacity: 0.8, bgcolor: 'primary.main' }
              }}
            >
              <i className="material-icons">arrow_back</i>
            </IconButton>
          </Tooltip>
          {capitalize(event.name)}
        </Typography>
        {event?.owner?.id !== user?.id && event.active && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection={{ md: 'row', xs: 'column' }}
            mt={{ md: 0, xs: 2 }}
            gap={1}
            width={'100%'}
            maxWidth={230}
          >
            {event?.reservations?.some(
              reservation =>
                reservation?.user?.id === user?.id &&
                (reservation.status === 'PENDING' ||
                  reservation.status === 'APPROVED')
            ) ? (
              <Button
                onClick={() => {
                  event?.reservations?.find(
                    reservation =>
                      reservation?.user?.id === user?.id &&
                      setRequestsStatus(reservation.id)
                  );
                }}
                loading={loading}
                startIcon={<i className="material-icons">schedule_send</i>}
              >
                Acompanhar reserva
              </Button>
            ) : (
              <Button
                onClick={handleRequestAccess}
                loading={loading}
                startIcon={<i className="material-icons">schedule_send</i>}
              >
                Solicitar acesso
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 2
            }}
            variant="rounded"
          >
            <span className="material-icons" style={{ fontSize: '120px' }}>
              event
            </span>
          </Avatar>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h4"
            color={
              !event.active
                ? 'primary.main'
                : new Date(event.startDate) < new Date() &&
                  new Date(event.endDate) > new Date()
                ? 'text.primary'
                : new Date(event.startDate) > new Date()
                ? 'white'
                : 'primary.main'
            }
            component="h2"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {capitalize(event.name)}{' '}
            <Typography
              bgcolor={
                !event.active
                  ? '#ccc'
                  : new Date(event.startDate) < new Date() &&
                    new Date(event.endDate) > new Date()
                  ? 'secondary.main'
                  : new Date(event.startDate) > new Date()
                  ? 'primary.main'
                  : '#ccc'
              }
              px={2}
              borderRadius={2}
            >
              {!event.active
                ? 'Cancelado'
                : new Date(event.startDate) < new Date() &&
                  new Date(event.endDate) > new Date()
                ? 'Em andamento'
                : new Date(event.startDate) > new Date()
                ? 'Em breve'
                : 'Finalizado'}
            </Typography>
          </Typography>

          <Typography variant="body2" color="text.primary">
            <span style={{ whiteSpace: 'nowrap' }}>
              <Typography
                variant="body2"
                fontWeight="600"
                component="span"
                color="text.primary"
              >
                De{' '}
              </Typography>
              {format(new Date(event?.startDate), 'Pp', {
                locale: ptBR
              })}
            </span>
            <span style={{ whiteSpace: 'nowrap' }}>
              <Typography
                variant="body2"
                fontWeight="600"
                component="span"
                color="text.primary"
              >
                {' '}
                até{' '}
              </Typography>

              {format(new Date(event?.endDate), 'Pp', {
                locale: ptBR
              })}
            </span>
          </Typography>
          <Typography my={4}>{event.description}</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" component="p" color="primary" ml={0.5}>
              {event.value ? formatCurrency(event.value) : 'GRATUITO'}
            </Typography>
            <Box display="flex" alignItems="center">
              {event?.reservations
                ?.filter(reservation => reservation.status === 'APPROVED')
                .map((reservation, index) => (
                  <Tooltip key={reservation.id} title={reservation?.user?.name}>
                    <Avatar
                      onClick={() => push(`/profile/${reservation?.user?.id}`)}
                      sx={{
                        ml: -1.5,
                        boxShadow: '4px 4px 4px rgba(0,0,0,0.2)',
                        bgcolor:
                          index % 2 === 0 ? 'primary.main' : 'secondary.main',
                        cursor: 'pointer'
                      }}
                      src={reservation?.user?.picture}
                    >
                      {reservation?.user?.name[0].toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
            </Box>
          </Box>
          <Typography variant="caption" component="p" fontWeight="600" ml={0.5}>
            Criado por:{' '}
            <Typography variant="caption" component="span" ml={0.5}>
              {capitalize(event?.owner?.name)},{' '}
              <Typography variant="caption" fontWeight="600" component="span">
                {' '}
                em{' '}
              </Typography>
              {format(new Date(event.createdAt), 'PPp', { locale: ptBR })}
            </Typography>
            <Typography
              pl={2}
              variant="caption"
              fontWeight="600"
              component="span"
            >
              {' '}
              Lotação{' '}
            </Typography>
            <Typography variant="caption" color="primary">
              {event?.limit
                ? `${
                    event?.reservations.filter(
                      reservation => reservation.status === 'APPROVED'
                    ).length
                  }/${event?.limit} - Pessoas`
                : 'Sem limite de pessoas'}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default EventDetail;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  try {
    setTokenSsr(req, res);
    const data = await EventService.getEvent(`${params?.slug}`, query);
    return {
      props: { data }
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
