import { Box, Fab } from '@mui/material';
import { DrawerStyled } from '../base-drawer/base-drawer.styles';

interface BaseDrawerProps {
  open: boolean;
  setOpen: () => void;
  content: JSX.Element;
  width: number;
  direction?: 'bottom' | 'left' | 'right' | 'top';
}

export const BaseDrawer: React.FC<BaseDrawerProps> = ({
  open,
  setOpen,
  content,
  width,
  direction = 'right'
}) => {
  return (
    <Box>
      <DrawerStyled
        width={width}
        anchor={direction}
        open={open}
        onClose={setOpen}
        sx={{ position: 'relative' }}
      >
        <Fab
          color="primary"
          onClick={setOpen}
          sx={{
            position: 'absolute',
            left: 0,
            borderRadius: '0 20px 20px 0',
            top: '70px'
          }}
        >
          <i className="fa fa-chevron-right" />
        </Fab>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          gap={4}
          p={4}
        >
          {content}
        </Box>
      </DrawerStyled>
    </Box>
  );
};
