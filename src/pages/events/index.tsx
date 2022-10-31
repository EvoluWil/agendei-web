import {
  Avatar,
  Box,
  Grid,
  Typography,
  Container,
  Divider
} from '@mui/material';
import { format, sub, startOfMonth, add, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FiltersFields,
  Query,
  QueryString
} from 'nestjs-prisma-querybuilder-interface';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../../components/ui/button/button.component';
import { Calendar } from '../../components/ui/calendar/calendar.component';
import { EventCard } from '../../components/ui/event-card/event-card.component';
import { SearchInput } from '../../components/ui/inputs/serach-input/search-input.component';
import { IEvent } from '../../data/models/event.model';
import { EventService } from '../../data/services/event.service';
import { formatEventsToCalendar } from '../../utils/formatters/format-events-calendar.util';

const mockEvents = [
  {
    id: '1',
    slug: 'Evento',
    name: 'evento',
    startDate: new Date(),
    endDate: add(new Date(), { days: 2 }),
    active: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis fugiat est aperiam corrupti nam cupiditate blanditiis, unde architecto pariatur hic veniam molestias, omnis porro laborum, nostrum ipsa inventore iusto. Distinctio!',
    address: 'rua 1',
    state: 'estado',
    district: 'bairro',
    city: 'cidade',
    value: 0,
    limit: 5,
    picture: 'https://thispersondoesnotexist.com/image',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: '1'
  },
  {
    id: '12',
    slug: 'Evento2',
    name: 'evento2',
    startDate: add(new Date(), { days: 9 }),
    endDate: add(new Date(), { days: 12 }),
    active: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis fugiat est aperiam corrupti nam cupiditate blanditiis, unde architecto pariatur hic veniam molestias, omnis porro laborum, nostrum ipsa inventore iusto. Distinctio!',
    address: 'rua 12',
    state: 'estado2',
    district: 'bairro2',
    city: 'cidade2',
    value: 0,
    limit: 5,
    picture: 'https://thispersondoesnotexist.com/image',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: '21'
  },
  {
    id: '13',
    slug: 'Evento3',
    name: 'evento3',
    startDate: add(new Date(), { days: 5 }),
    endDate: add(new Date(), { days: 6 }),
    active: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis fugiat est aperiam corrupti nam cupiditate blanditiis, unde architecto pariatur hic veniam molestias, omnis porro laborum, nostrum ipsa inventore iusto. Distinctio!',
    address: 'rua 13',
    state: 'estado3',
    district: 'bairro3',
    city: 'cidade3',
    value: 0,
    limit: 5,
    picture: 'https://thispersondoesnotexist.com/image',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: '31'
  }
];

const query: Query = {
  select: 'id startDate endDate',
  populate: [
    { path: 'user', select: 'name' },
    { path: 'residence', select: 'identification users' }
  ],
  filter: [
    {
      and: [
        {
          path: 'startDate',
          operator: 'gte',
          value: sub(startOfMonth(new Date()), { days: 7 }).toISOString(),
          type: 'date'
        },
        {
          path: 'startDate',
          operator: 'lte',
          value: add(endOfMonth(new Date()), { days: 7 }).toISOString(),
          type: 'date'
        }
      ]
    }
  ]
};

interface EventsPageProps {
  data: IEvent[];
}
const EventsPage: React.FC<EventsPageProps> = ({ data }) => {
  const [events, setEvents] = useState(formatEventsToCalendar(mockEvents));
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleDateClick = (date: Date) => {
    push(`/panel/reservations/date/${date}`);
  };

  const handleMonthChange = async (date: Date) => {
    const filter: FiltersFields = [
      {
        startDate: {
          gte: sub(startOfMonth(new Date(date)), { days: 7 }).toISOString()
        }
      },
      {
        startDate: {
          lte: add(endOfMonth(new Date(date)), { days: 7 }).toISOString()
        }
      }
    ];
    console.log(QueryString({ ...query, filter }));
  };
  return (
    <>
      <Head>
        <title>Eventos | Agendei</title>
      </Head>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ md: 'row', xs: 'column' }}
        my={2}
      >
        <Typography variant="h4" component="h2">
          Agenda
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexDirection={{ md: 'row', xs: 'column' }}
          mt={{ md: 0, xs: 2 }}
          gap={1}
          width={'100%'}
          maxWidth={600}
        >
          <SearchInput onChange={setSearch} label="Buscar evento" />
        </Box>
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          p={1}
          borderRadius={2}
          border="1px solid #ddd"
          height={{ xs: 430, md: 'calc(100vh - 100px)' }}
        >
          <Calendar
            events={events}
            onMonthChange={handleMonthChange}
            onDateClick={handleDateClick}
          />
        </Grid>
        <Grid item xs={12} md={4} pl={2}>
          <Typography fontWeight={600}>Em Andamento</Typography>
          {events
            .filter(
              event =>
                new Date(event.resource.startDate) < new Date() &&
                new Date(event.resource.endDate) > new Date()
            )
            .map(event => (
              <EventCard key={event.resource.id} event={event} current />
            ))}
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600}>Em Breve</Typography>
          {events
            .filter(event => new Date(event.resource.startDate) > new Date())
            .map(event => (
              <EventCard key={event.resource.id} event={event} />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const data = await EventService.getEvents(query);
    return {
      props: { data }
    };
  } catch (err) {
    return {
      props: { data: [] }
    };
  }
};
