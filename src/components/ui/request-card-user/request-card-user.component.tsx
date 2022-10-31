import { Box, Typography, Avatar, Tooltip, IconButton } from '@mui/material';
import { User } from '../../../data/models/user.model';
import { capitalize } from '../../../utils/formatters/capitalize.util';
import { Button } from '../button/button.component';

interface RequestCardUserProps {
  user: User;
  onClick: (value: 'APPROVED' | 'REJECTED') => void;
}

export const RequestCardUser: React.FC<RequestCardUserProps> = ({
  user,
  onClick
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src={user?.picture} sx={{ bgcolor: 'primary.main' }}>
        <Typography sx={{ mx: 'auto' }}>
          {user?.name[0]?.toUpperCase()}
        </Typography>
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.primary" mb={-1}>
          {capitalize(user?.name || '')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.email}
        </Typography>
      </Box>
      <Tooltip title="Aprovar">
        <IconButton
          onClick={() => onClick('APPROVED')}
          size="small"
          color="success"
        >
          <i className="material-icons">thumb_up</i>
        </IconButton>
      </Tooltip>
      <Tooltip title="Reprovar">
        <IconButton
          onClick={() => onClick('REJECTED')}
          size="small"
          color="error"
        >
          <i className="material-icons">thumb_down</i>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
