import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Box, Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Reservation } from '../../../data/models/reservation.model';
import { capitalize } from '../../../utils/formatters/capitalize.util';

interface ReservationCardProps {
  reservation: Reservation;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation
}) => {
  const { push } = useRouter();
  return (
    <Box
      key={reservation?.id}
      bgcolor="primary.main"
      display="flex"
      alignItems="center"
      p={1}
      my={0.5}
      gap={2}
      borderRadius={5}
      sx={{ '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
      onClick={() => push(`/events/${reservation?.event?.slug}`)}
    >
      <Avatar
        src={reservation?.event?.picture}
        sx={{
          width: 56,
          height: 56,
          bgcolor: 'white',
          color: 'primary.main',
          fontSize: 24
        }}
      >
        <i className="fa fa-calendar-check-o " />
      </Avatar>
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontWeight="bold" color="#fff">
          {capitalize(reservation?.event?.name)}
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          gap={0.2}
          variant="caption"
          fontWeight="bold"
          color="#fff"
        >
          <i className="material-icons" style={{ marginRight: '4px' }}>
            tips_and_updates
          </i>
          {reservation.status}
          <i className="material-icons" style={{ margin: '0 4px 0 8px' }}>
            history
          </i>
          {format(new Date(reservation.updatedAt), 'Pp', { locale: ptBR })}
        </Typography>
        <Typography variant="caption" color="#fff">
          <i className="fa fa-calendar" style={{ marginRight: '4px' }} />

          <span style={{ whiteSpace: 'nowrap' }}>
            <Typography variant="caption" fontWeight="600" color="#fff">
              De{' '}
            </Typography>
            {format(new Date(reservation?.event?.startDate), 'Pp', {
              locale: ptBR
            })}
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <Typography variant="caption" fontWeight="600" color="#fff">
              {' '}
              até{' '}
            </Typography>

            {format(new Date(reservation?.event?.endDate), 'Pp', {
              locale: ptBR
            })}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};
