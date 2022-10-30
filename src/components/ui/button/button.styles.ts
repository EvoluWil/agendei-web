import { styled, Button } from '@mui/material';

export const ButtonStyled = styled(Button)`
  border-radius: ${({ size }) => (size === 'small' ? 12 : 15)}px;
`;
