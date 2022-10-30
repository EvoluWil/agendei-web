import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterStyled = styled('footer')`
  background-color: #fafafa;
  padding: ${({ theme }) => theme.spacing(2)} 0;
  margin-top: auto;
  box-shadow: 5px 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const FooterContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

export const LogoFooterContainer = styled('a')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  img {
    width: 100%;
  }
`;
export const ColumnContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
`;

export const SocialContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;
