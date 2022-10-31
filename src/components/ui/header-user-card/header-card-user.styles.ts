import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

export const UserInformationContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const UserName = styled('div')`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    color: ${({ theme }) => theme.palette.grey[100]};
    font-weight: normal;
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;

export const AvatarStyled = styled(Avatar)`
  width: 30px;
  height: initial;
  aspect-ratio: 1;
  font-weight: normal;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) =>
    theme.palette.getContrastText(theme.palette.primary.main)};

  .MuiSvgIcon-root {
    margin: 0 auto;
  }

  .MuiAvatar-img {
    object-fit: cover;
  }
`;
