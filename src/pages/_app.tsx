import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '../styles/globals.styles';
import theme from '../styles/theme.styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
export default App;
