import { styled } from '@mui/material';
import Link from 'next/link';

export const LinkStyled = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
