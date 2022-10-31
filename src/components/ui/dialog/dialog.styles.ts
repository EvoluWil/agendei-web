import { styled, Dialog } from '@mui/material';

export const DialogStyled = styled(Dialog)`
  main {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const DialogIconContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;
