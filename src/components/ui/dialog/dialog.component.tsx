import React from 'react';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { DialogIconContainer, DialogStyled } from './dialog.styles';

interface DialogProps {
  title: string;
  message: string | JSX.Element;
  type: 'question' | 'info';
  open: boolean;
  setOpen: () => void;
  result: (value: boolean) => Promise<boolean> | any;
  isLoading?: boolean;
}
const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  type,
  open,
  setOpen,
  isLoading,
  result
}) => {
  return (
    <DialogStyled open={open}>
      <main>
        <DialogIconContainer>
          {type === 'info' ? (
            <i style={{ fontSize: '72px' }} className="material-icons">
              info
            </i>
          ) : (
            <i style={{ fontSize: '72px' }} className="material-icons">
              help
            </i>
          )}
        </DialogIconContainer>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>{message}</div>
        </DialogContent>

        <DialogActions>
          {type === 'question' ? (
            <>
              <Button
                variant="contained"
                color="error"
                type="submit"
                onClick={() => {
                  result(false);
                  setOpen();
                }}
                autoFocus
              >
                Não
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={isLoading}
                onClick={async () => {
                  await result(true);
                  setOpen();
                }}
                type="submit"
                sx={{ color: '#fff' }}
              >
                {isLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  'Sim'
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              type="submit"
              onClick={async () => {
                await result(false);
                setOpen();
              }}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'Ok'
              )}
            </Button>
          )}
        </DialogActions>
      </main>
    </DialogStyled>
  );
};
export default Dialog;
