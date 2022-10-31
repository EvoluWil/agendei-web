import { Box, Divider, Fab, Grid, Tooltip, Typography } from '@mui/material';
import { add, endOfMonth, startOfMonth, sub } from 'date-fns';
import { FiltersFields, Query } from 'nestjs-prisma-querybuilder-interface';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { CreateEventDrawer } from '../../components/drawer/create-event/create-event.component';
import { Calendar } from '../../components/ui/calendar/calendar.component';
import { EmptyData } from '../../components/ui/empty-data/empty-data.component';
import { EventCard } from '../../components/ui/event-card/event-card.component';
import { SearchInput } from '../../components/ui/inputs/serach-input/search-input.component';
import { useAuth } from '../../contexts/auth.context';
import { useEvent } from '../../contexts/event.context';
import { IEvent } from '../../data/models/event.model';
import { formatEventsToCalendar } from '../../utils/formatters/format-events-calendar.util';
import { NestError } from '../../utils/formatters/format-nest.util';

const query: Query = {
  select:
    'id name startDate endDate limit picture value reservations active slug',
  operator: 'and',
  filter: [
    {
      path: 'startDate',
      value: sub(startOfMonth(new Date()), { days: 7 }).toISOString(),
      type: 'date',
      operator: 'gte'
    },
    {
      path: 'startDate',
      value: add(endOfMonth(new Date()), { days: 7 }).toISOString(),
      type: 'date',
      operator: 'lte'
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

  const { getEvents } = useEvent();
  const { user } = useAuth();

  const getData = useCallback(
    async (query: Query) => {
      try {
        const data = await getEvents(query);
        setEvents(formatEventsToCalendar(data));
      } catch (err) {
        NestError(err);
      }
    },
    [getEvents]
  );

  const handleFilter = (term: string) => {
    if (term) {
      const filter: FiltersFields[] = [
        {
          path: 'name',
          value: term,
          type: 'string',
          operator: 'contains'
        }
      ];
      getData({ ...query, filter });
    }
  };

  const handleMonthChange = async (date: Date) => {
    const filter: FiltersFields[] = [
      {
        path: 'startDate',
        value: sub(startOfMonth(new Date(date)), { days: 7 }).toISOString(),
        type: 'date',
        operator: 'gte'
      },
      {
        path: 'startDate',
        value: add(endOfMonth(new Date(date)), { days: 7 }).toISOString(),
        type: 'date',
        operator: 'lte'
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
      {!!user && (
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
      )}
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
