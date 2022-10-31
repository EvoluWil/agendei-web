import { Box, Paper, Typography } from '@mui/material';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReportList } from '../components/ui/report-list/report-list.component';
import { User } from '../data/models/user.model';
import { UserService } from '../data/services/user.service';

import { setTokenSsr } from '../utils/functions/set-token-ssr.util';

const query: Query = {
  select: 'name id email picture reservations ownerEvents',
  populate: [
    {
      path: 'ownerEvents',
      select: 'name id startDate endDate slug limit reservations value picture'
    },
    {
      path: 'reservations',
      select: 'userId eventId status createdAt',
      populate: [
        {
          path: 'event',
          select:
            'name id startDate endDate slug limit reservations value picture'
        }
      ]
    }
  ]
};

interface ReportProps {
  data: User[];
}

const Report: React.FC<ReportProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Relatórios | Agendei</title>
      </Head>

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
      </Box>
      <Box component={Paper} p={2}>
        <Typography variant="h5" color="primary">
          Usuários
        </Typography>
        <ReportList users={data} />
      </Box>
    </>
  );
};

export default Report;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    setTokenSsr(req, res);
    const data = await UserService.getUsers(query);
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
