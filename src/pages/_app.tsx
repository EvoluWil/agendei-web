import { ThemeProvider, Container } from '@mui/material';
import type { AppProps } from 'next/app';
import { FooterDynamic } from '../components/display/footer/footer.dynamic';
import { Header } from '../components/display/header/header.component';
import { AuthProvider } from '../contexts/auth.context';
import { EventProvider } from '../contexts/event.context';
import { ReservationProvider } from '../contexts/reservation.context';
import { UserProvider } from '../contexts/user.context';
import { GlobalStyles } from '../styles/globals.styles';
import theme from '../styles/theme.styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <EventProvider>
            <ReservationProvider>
              <GlobalStyles />
              <Header />
              <Container
                sx={{
                  my: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh'
                }}
              >
                <Component {...pageProps} />
              </Container>
              <FooterDynamic />
            </ReservationProvider>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
