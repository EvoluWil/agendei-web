import { styled } from '@mui/material';

export const LinkButtonContainer = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
