import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/auth.context';
import { capitalize } from '../../../utils/formatters/captalize.util';
import {
  UserInformationContainer,
  UserName,
  AvatarStyled
} from './header-card-user.styles';

interface UserInformationProps {
  picture: string;
  name: string;
  onClick?: () => void;
  mobile?: boolean;
  contrast?: boolean;
}

export const HeaderCardUser: React.FC<UserInformationProps> = ({
  name,
  picture,
  mobile,
  contrast
}) => {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const { route, push } = useRouter();

  const isPanel = useMemo(() => {
    if (route.includes('/panel')) {
      return true;
    } else {
      return false;
    }
  }, [route]);

  const handleNavigateClick = () => {
    if (isPanel) {
      push('/');
    } else {
      push('/panel');
    }
  };

  const handleSignOut = () => {
    signOut();
    push('/');
  };

  return (
    <UserInformationContainer>
      {mobile ? (
        <>
          <AvatarStyled src={picture}>{name[0]?.toUpperCase()}</AvatarStyled>
          <UserName>Meu Painel</UserName>
        </>
      ) : (
        <>
          <AvatarStyled src={picture} contrast={contrast?.toString()}>
            <Typography sx={{ mx: 'auto' }}>
              {name[0]?.toUpperCase()}
            </Typography>
          </AvatarStyled>
          <UserName contrast={contrast?.toString()}>
            {capitalize(name)}
          </UserName>
          <ButtonGroup variant="text" ref={anchorRef}>
            <Button
              size="small"
              onClick={handleToggle}
              color={contrast ? 'inherit' : 'primary'}
            >
              <i className="material-icons">expand_more</i>
            </Button>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} disablePortal>
            <Paper sx={{ mr: 5, width: isPanel ? '137px' : '120px' }}>
              <ClickAwayListener onClickAway={handleToggle}>
                <MenuList id="split-button-menu">
                  <MenuItem onClick={handleNavigateClick}>
                    {isPanel ? 'Voltar ao site' : 'Meu painel'}
                  </MenuItem>
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
