import { Box, Typography, Button } from '@mui/material';

interface EmptyDataProps {
  message: string;
  buttonText?: string;
  onClick?: () => void;
}
export const EmptyData: React.FC<EmptyDataProps> = ({
  message,
  buttonText,
  onClick
}) => {
  return (
    <Box
      width="100%"
      borderRadius={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      py={8}
      gap={2}
    >
      <Typography variant="body2" color="primary">
        {message}
      </Typography>
      {onClick && buttonText && (
        <Button variant="contained" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
