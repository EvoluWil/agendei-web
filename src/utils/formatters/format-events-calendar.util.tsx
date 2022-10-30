import { Typography } from '@mui/material';
import { format, sub } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { CalendarEvent } from '../../components/ui/calendar/calendar.component';
import { IEvent } from '../../data/models/event.model';

export const formatEventsToCalendar = (events: IEvent[]): CalendarEvent[] => {
  return events?.map(event => ({
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: event,
    title: (
      <>
        <Typography sx={{ display: 'block', lineHeight: 1 }} variant="caption">
          {event.name}
        </Typography>
        <Typography sx={{ display: 'block', lineHeight: 1 }} variant="caption">
          {format(new Date(event.startDate), 'Pp', { locale: ptBR })}
        </Typography>
      </>
    )
  }));
};
