import { Typography, Fab } from '@mui/material';
import { useRouter } from 'next/router';
import { LinkButton } from '../../ui/link-button/link-button.component';
import {
  ColumnContainer,
  FooterContainer,
  FooterStyled,
  LogoFooterContainer,
  SocialContainer
} from './footer.styles';

const Footer = () => {
  const { route } = useRouter();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {route !== '/signIn' ? (
        <FooterStyled>
          <FooterContainer>
            <ColumnContainer className="logo">
              <LogoFooterContainer href="/">
                <img src="/images/logo.png" alt="agendei" />
              </LogoFooterContainer>
            </ColumnContainer>

            <ColumnContainer>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={scrollTop}
                sx={{ mb: 2, cursor: 'pointer' }}
              >
                <i className="fa fa-arrow-up" />
              </Fab>
              <Typography gutterBottom align="center" variant="caption">
                WrsTech ©2022
              </Typography>
            </ColumnContainer>

            <ColumnContainer>
              <Typography variant={'h6'}>Siga-nos</Typography>
              <SocialContainer>
                <LinkButton
                  url="https://github.com/Willian-Rodrigues"
                  icon="github-square"
                  title="GitHub"
                />
                <LinkButton
                  url="https://www.linkedin.com/in/willianrsilva/"
                  icon="linkedin-square"
                  title="LinkedIn"
                />
                <LinkButton
                  url="https://www.willianrodrigues.tk"
                  icon="globe"
                  title="Portfólio"
                />
              </SocialContainer>
            </ColumnContainer>
          </FooterContainer>
        </FooterStyled>
      ) : (
        <div />
      )}
    </>
  );
};

export default Footer;
