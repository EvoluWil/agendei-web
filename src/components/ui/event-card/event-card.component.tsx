import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Box, Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CalendarEvent } from '../calendar/calendar.component';

interface EventCardProps {
  event: CalendarEvent;
  current?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  current = false
}) => {
  const { push } = useRouter();
  return (
    <Box
      key={event.resource.id}
      bgcolor={current ? 'secondary.main' : 'primary.main'}
      display="flex"
      alignItems="center"
      p={1}
      my={0.5}
      gap={2}
      borderRadius={5}
      sx={{ '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
      onClick={() => push(`/events/${event.resource.slug}`)}
    >
      <Avatar
        src={event?.resource?.picture}
        sx={{
          width: 56,
          height: 56
        }}
      >
        <i className="fa fa-calendar-check-o" />
      </Avatar>
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontWeight="bold" color={current ? 'text.primary' : '#fff'}>
          {event?.resource?.name}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="bold"
          color={current ? 'text.primary' : '#fff'}
        >
          <i className="fa fa-dollar" style={{ marginRight: '4px' }} />
          {event?.resource?.value ? event?.resource?.value : 'Gratuito'}
          <i className="fa fa-users" style={{ margin: '0 4px 0 8px' }} />
          {event?.resource?.limit
            ? `${event?.resource?.limit} - Pessoas`
            : 'Sem limite de pessoas'}
        </Typography>
        <Typography variant="caption" color={current ? 'text.primary' : '#fff'}>
          <i className="fa fa-calendar" style={{ marginRight: '4px' }} />

          <span style={{ whiteSpace: 'nowrap' }}>
            <Typography
              variant="caption"
              fontWeight="600"
              color={current ? 'text.primary' : '#fff'}
            >
              De{' '}
            </Typography>
            {format(new Date(event?.resource?.startDate), 'Pp', {
              locale: ptBR
            })}
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <Typography
              variant="caption"
              fontWeight="600"
              color={current ? 'text.primary' : '#fff'}
            >
              {' '}
              até{' '}
            </Typography>

            {format(new Date(event?.resource?.endDate), 'Pp', {
              locale: ptBR
            })}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};
