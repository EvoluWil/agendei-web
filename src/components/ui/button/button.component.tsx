import { ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { ButtonStyled } from './button.styles';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  variant = 'contained',
  size = 'large',
  disabled,
  ...rest
}) => {
  return (
    <ButtonStyled
      fullWidth
      variant={variant}
      size={size}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <CircularProgress sx={{ color: '#fff', display: 'flex', height: 36 }} />
      ) : (
        children
      )}
    </ButtonStyled>
  );
};
