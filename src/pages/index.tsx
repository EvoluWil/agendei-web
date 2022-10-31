import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

const Home = () => {
  return (
    <Box>
      <Typography>Index</Typography>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/events',
      permanent: true
    }
  };
};
