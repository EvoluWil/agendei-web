import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  Box
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/auth.context';
import { capitalize } from '../../../utils/formatters/capitalize.util';
import {
  UserInformationContainer,
  UserName,
  AvatarStyled
} from './header-card-user.styles';

interface UserInformationProps {
  onClick?: () => void;
  mobile?: boolean;
}

export const HeaderCardUser: React.FC<UserInformationProps> = ({ mobile }) => {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const { signOut } = useAuth();
  const { user } = useAuth();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const { push } = useRouter();

  const handleNavigateClick = () => {
    push(`/profile/${user?.id}`);
  };

  const handleSignOut = () => {
    signOut();
    push('/');
  };

  return (
    <UserInformationContainer>
      {mobile ? (
        <>
          <AvatarStyled src={user?.picture}>
            {user?.name[0]?.toUpperCase()}
          </AvatarStyled>
          <UserName>Minha Conta</UserName>
        </>
      ) : (
        <>
          <AvatarStyled src={user?.picture}>
            <Typography sx={{ mx: 'auto' }}>
              {user?.name[0]?.toUpperCase()}
            </Typography>
          </AvatarStyled>
          <Box>
            <Typography variant="body2" color="text.primary" mb={-1}>
              {capitalize(user?.name || '')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <ButtonGroup variant="text" ref={anchorRef}>
            <Button size="small" onClick={handleToggle} color="primary">
              <i className="material-icons">expand_more</i>
            </Button>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} disablePortal>
            <Paper sx={{ mr: 5, width: 136 }}>
              <ClickAwayListener onClickAway={handleToggle}>
                <MenuList id="split-button-menu">
                  <MenuItem onClick={handleNavigateClick}>Minha Conta</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sair</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </>
      )}
    </UserInformationContainer>
  );
};
