import { useEffect, useState } from 'react';
import {
  Toolbar,
  useScrollTrigger,
  Slide,
  IconButton,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
  Box
} from '@mui/material/';

import { useRouter } from 'next/router';

import { Link } from '../../ui/link/link.component';
import { AnimatedLink, AppBarComponent } from './header.styles';
import { DrawerComponent } from './drawer.component';
import { useAuth } from '../../../contexts/auth.context';
import { HeaderCardUser } from '../../ui/header-user-card/header-user-card.component';
import { Button } from '../../ui/button/button.component';
import { AuthDrawer } from '../../drawer/auth/auth.component';

interface Props {
  children: React.ReactElement;
}

const HideOnScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const menuItems = [
  {
    link: '/',
    name: 'Inicio',
    icon: <i className="fa fa-home" />
  },
  {
    link: '/events',
    name: 'Eventos',
    icon: <i className="fa fa-briefcase" />
  }
];

export const Header = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInDrawerOpen, setSignInDrawerOpen] = useState<
    'signIn' | 'signUp' | ''
  >('');

  const { route } = useRouter();
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setBackdrop(false);
  }, [route]);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AuthDrawer
        open={!!signInDrawerOpen}
        setOpen={() => setSignInDrawerOpen('')}
        mode={signInDrawerOpen || 'signIn'}
      />
      <nav id="navbar">
        <HideOnScroll>
          <AppBarComponent elevation={0} position={'sticky'}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ display: 'flex' }}>
                <Link href="/">
                  <img src="/images/logo.png" alt="Beach House" width={'20%'} />
                </Link>
                <Box ml="auto">
                  <Box display="flex" alignItems="center" gap={1}>
                    {menuItems.map(item => (
                      <Box
                        display={{ xs: 'none', md: 'inline' }}
                        key={item.name}
                      >
                        <AnimatedLink
                          onClick={() => {
                            if (route !== item.link) setBackdrop(true);
                          }}
                          className={route === item.link ? 'active' : 'inative'}
                          href={item.link}
                        >
                          {item.name}
                        </AnimatedLink>
                      </Box>
                    ))}

                    <Box display={{ xs: 'none', md: 'flex' }} ml={1}>
                      {!!user ? (
                        <HeaderCardUser />
                      ) : (
                        <Box display="flex" alignItems="center" gap={1}>
                          <Button
                            onClick={() => setSignInDrawerOpen('signIn')}
                            variant="outlined"
                            size="small"
                          >
                            Entrar
                          </Button>
                          <Button
                            onClick={() => setSignInDrawerOpen('signUp')}
                            size="small"
                            sx={{ minWidth: 120 }}
                          >
                            Cadastre-se
                          </Button>
                        </Box>
                      )}
                    </Box>
                    <IconButton
                      aria-label="Open Navigation"
                      size="large"
                      sx={{ display: { md: 'none' } }}
                      onClick={handleDrawerToggle}
                    >
                      <Typography color="primary.main">
                        <i className="fa fa-bars" />
                      </Typography>
                    </IconButton>
                  </Box>
                </Box>
              </Toolbar>
            </Container>
          </AppBarComponent>
        </HideOnScroll>

        <DrawerComponent
          menuItems={[
            ...menuItems,
            {
              link: '/',
              name: 'Sair',
              icon: <i className="fa fa-sign-out" />,
              signOut: true
            }
          ]}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      </nav>
      {/* <img src="/banner.png" alt="Banner Beach House" width="100%" /> */}
    </>
  );
};
