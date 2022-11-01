import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Paper
} from '@mui/material';
import {
  Reservation,
  ReservationStatusLabel
} from '../../../data/models/reservation.model';
import { capitalize } from '../../../utils/formatters/capitalize.util';

interface ReservationStatusCardProps {
  reservation: Reservation;
  onClick: () => void;
}

export const ReservationStatusCard: React.FC<ReservationStatusCardProps> = ({
  reservation,
  onClick
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      borderRadius={2}
      px={2}
      py={1}
      boxShadow="4px 4px 4px rgba(0, 0, 0, 0.1)"
    >
      <Avatar
        src={reservation?.event?.picture}
        sx={{ bgcolor: 'primary.main' }}
      >
        <Typography sx={{ mx: 'auto' }}>
          {reservation?.event?.name[0]?.toUpperCase()}
        </Typography>
      </Avatar>
      <Box>
        <Typography
          display="flex"
          justifyContent="center"
          variant="caption"
          px={2}
          borderRadius={2}
          bgcolor={theme => theme.palette.primary.main}
          color={ReservationStatusLabel[reservation?.status].color}
        >
          {ReservationStatusLabel[reservation?.status].label}
        </Typography>

        <Typography variant="body2" color="text.primary" mb={-1}>
          {capitalize(reservation?.event?.name || '')}
        </Typography>
      </Box>
      {(reservation?.status === 'PENDING' ||
        reservation?.status === 'APPROVED') && (
        <Tooltip title="Cancelar Reserva">
          <IconButton onClick={onClick} size="small" color="error">
            <i className="material-icons">cancel</i>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
