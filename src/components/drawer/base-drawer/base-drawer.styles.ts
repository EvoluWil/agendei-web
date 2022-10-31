import { Drawer, styled } from '@mui/material';

interface DrawerStyledProps {
  width: number;
}
export const DrawerStyled = styled(Drawer)<DrawerStyledProps>`
  .MuiDrawer-paper {
    width: ${({ width }) => width}vw;
    padding: ${({ theme }) => theme.spacing(4)};

    ${({ theme }) => theme.breakpoints.down('md')} {
      width: 90vw;
    }
  }
`;
