import {
  Avatar,
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Tooltip,
  Fab
} from '@mui/material';
import { format, sub, startOfMonth, add, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FiltersFields,
  Query,
  QueryString
} from 'nestjs-prisma-querybuilder-interface';
import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, use, useCallback } from 'react';
import { CreateEventDrawer } from '../../components/drawer/create-event/create-event.component';
import { Button } from '../../components/ui/button/button.component';
import { Calendar } from '../../components/ui/calendar/calendar.component';
import { EmptyData } from '../../components/ui/empty-data/empty-data.component';
import { EventCard } from '../../components/ui/event-card/event-card.component';
import { SearchInput } from '../../components/ui/inputs/serach-input/search-input.component';
import { useEvent } from '../../contexts/event.context';
import { IEvent } from '../../data/models/event.model';
import { formatEventsToCalendar } from '../../utils/formatters/format-events-calendar.util';

const query: Query = {
  select:
    'id name startDate endDate limit picture value reservations active slug',
  filter: [
    {
      and: [
        {
          startDate: {
            gte: sub(startOfMonth(new Date()), { days: 7 }).toISOString()
          }
        },
        {
          startDate: {
            lte: add(endOfMonth(new Date()), { days: 7 }).toISOString()
          }
        }
      ]
    }
  ]
};

interface EventsPageProps {
  data: IEvent[];
}
const EventsPage: React.FC<EventsPageProps> = ({ data }) => {
  const [events, setEvents] = useState(formatEventsToCalendar(data));
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { push } = useRouter();
  const { getEvents } = useEvent();

  const getData = useCallback(
    async (query: Query) => {
      const data = await getEvents(query);
      setEvents(formatEventsToCalendar(data));
    },
    [getEvents]
  );

  const handleFilter = (term: string) => {
    if (term) {
      const filter: FiltersFields = [{ name: { contains: term } }];
      getData({ ...query, filter });
    }
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
    getData({ ...query, filter });
  };

  useEffect(() => {
    getData(query);
  }, [getData]);

  return (
    <>
      <Head>
        <title>Eventos | Agendei</title>
      </Head>
      <Tooltip title="Criar evento">
        <Fab
          color="primary"
          onClick={() => setCreateEventOpen(true)}
          sx={{
            position: 'fixed',
            right: 0,
            borderRadius: '20px 0 0 20px',
            top: '90px'
          }}
        >
          <i className="fa fa-calendar-plus-o fa-2x" />
        </Fab>
      </Tooltip>

      <CreateEventDrawer
        open={createEventOpen}
        setOpen={() => setCreateEventOpen(false)}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ md: 'row', xs: 'column' }}
        mb={4}
      >
        <Typography variant="h4" color="primary.main" component="h2">
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
          <SearchInput
            onChange={value => {
              handleFilter(value);
              setSearch(value);
            }}
            label="Buscar evento"
          />
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
          <Calendar events={events} onMonthChange={handleMonthChange} />
        </Grid>
        <Grid item xs={12} md={4} pl={2}>
          {search ? (
            <>
              <Typography fontWeight={600} color="primary.main" mb={4}>
                Resultado da busca
              </Typography>
              {events?.map(event => (
                <EventCard key={event.resource.id} event={event} current />
              ))}
            </>
          ) : (
            <>
              <Typography fontWeight={600} color="primary.main" mb={4}>
                Eventos do mês
              </Typography>
              <Typography fontWeight={600}>Em Andamento</Typography>
              {events
                ?.filter(
                  event =>
                    new Date(event.resource.startDate) < new Date() &&
                    new Date(event.resource.endDate) > new Date() &&
                    event.resource.active
                )
                .map(event => (
                  <EventCard key={event.resource.id} event={event} current />
                ))}

              {!events?.filter(
                event =>
                  new Date(event.resource.startDate) < new Date() &&
                  new Date(event.resource.endDate) > new Date() &&
                  event.resource.active
              ).length && <EmptyData message="Nenhum evento em andamento" />}

              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={600}>Em Breve</Typography>
              {events
                ?.filter(
                  event =>
                    new Date(event.resource.startDate) > new Date() &&
                    event.resource.active
                )
                .map(event => (
                  <EventCard key={event.resource.id} event={event} />
                ))}

              {!events?.filter(
                event =>
                  new Date(event.resource.startDate) > new Date() &&
                  event.resource.active
              ).length && (
                <EmptyData message="Nenhum evento no restante do mês" />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default EventsPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24 // 24 horas
  };
};
