import { css, Global } from '@emotion/react';
import { useTheme } from '@mui/material';

export const GlobalStyles: React.FC = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          color: ${theme.palette.text.primary};
          background: ${theme.palette.background.paper};
        }
        html {
          overflow: auto;
        }
        body,
        input,
        textarea,
        select,
        button {
          font: 400 1rem 'Poppins', Arial, Helvetica, sans-serif;
        }
        button {
          cursor: pointer;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
};
