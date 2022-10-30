import { AppBar, styled } from '@mui/material';
import { Link } from '../../ui/link/link.component';

export const AppBarComponent = styled(AppBar)`
  background-color: #fafafa;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`;

export const AnimatedLink = styled(Link)`
  padding: 12px 15px;
  text-decoration: none !important;
  position: relative;
  color: ${({ theme }) => theme.palette.primary.main};

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.palette.primary.main};
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &.active::before,
  :hover::before {
    visibility: visible;
    width: 100%;
  }
`;
