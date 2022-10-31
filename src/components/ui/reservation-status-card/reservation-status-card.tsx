import { Box, Typography, Avatar, Tooltip, IconButton } from '@mui/material';
import { Reservation } from '../../../data/models/reservation.model';
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
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar
        src={reservation?.event?.picture}
        sx={{ bgcolor: 'primary.main' }}
      >
        <Typography sx={{ mx: 'auto' }}>
          {reservation?.event?.name[0]?.toUpperCase()}
        </Typography>
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.primary" mb={-1}>
          {capitalize(reservation?.event?.name || '')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {reservation?.status}
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
