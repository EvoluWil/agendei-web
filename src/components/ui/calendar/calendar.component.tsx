import { format, getDay, parse, startOfWeek } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';
import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/auth.context';
import { IEvent } from '../../../data/models/event.model';

const locales = {
  'pt-BR': ptBR
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const messages = {
  allDay: 'Dia Inteiro',
  previous: '<',
  next: '>',
  today: 'Atual',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  showMore: (total: any) => `+ (${total}) Eventos`
};

export type CalendarEvent = {
  title: string | JSX.Element;
  start: Date;
  end: Date;
  resource: IEvent;
};

interface CalendarProps {
  events: CalendarEvent[];
  onMonthChange: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  onMonthChange
}) => {
  const { push } = useRouter();
  const { user } = useAuth();
  return (
    <BigCalendar
      style={{ height: '95%' }}
      eventPropGetter={event => {
        if (
          !event.resource.active ||
          new Date(event.resource.endDate) < new Date()
        ) {
          return {
            style: {
              backgroundColor: '#A1A1A1',
              borderRadius: '8px',
              minHeight: '10px'
            }
          };
        }
        return {
          style: {
            backgroundColor:
              new Date(event.resource.startDate) > new Date()
                ? '#0635c9'
                : '#1ae5be',
            borderRadius: '8px',
            minHeight: '10px'
          }
        };
      }}
      messages={messages}
      selectable
      localizer={localizer}
      events={events}
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={({ resource }) => {
        if (user) {
          return push(`/events/${resource.slug}`);
        }
        toast.info('Faça login ou crie uma conta para acessar eventos');
      }}
      onNavigate={event => onMonthChange(event)}
      culture="pt-BR"
    />
  );
};
