import { BaseDrawer } from '../base-drawer/base-drawer.component';
import { useAuth } from '../../../contexts/auth.context';
import { useEffect, useState } from 'react';
import { SignIn } from './sign-in.component';
import { SignUp } from './sign-up.component';
import { FieldValues } from 'react-hook-form';
import { useUser } from '../../../contexts/user.context';
import {
  NestError,
  NestSuccess
} from '../../../utils/formatters/format-nest.util';

interface AuthDrawerProps {
  open: boolean;
  setOpen: () => void;
  mode: 'signIn' | 'signUp';
}

export const AuthDrawer: React.FC<AuthDrawerProps> = ({
  open,
  setOpen,
  mode: initialMode
}) => {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { createUser } = useUser();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signIn(email, password);
      setOpen();
      setLoading(false);
    } catch (err) {
      NestError(err);
      setLoading(false);
    }
  };

  const handleSignUp = async (data: FieldValues) => {
    setLoading(true);
    try {
      await createUser(data);
      NestSuccess('Cadastro realizado com sucesso');
      setLoading(false);
      setOpen();
    } catch (err) {
      setLoading(false);
      NestError(err);
    }
  };

  const handleChangeMode = () => {
    setMode(prev => (prev === 'signIn' ? 'signUp' : 'signIn'));
  };

  useEffect(() => {
    if (open) {
      setMode(initialMode);
    }
  }, [initialMode, open]);

  return (
    <BaseDrawer
      open={open}
      setOpen={setOpen}
      width={30}
      content={
        mode === 'signIn' ? (
          <SignIn
            onSubmit={handleSignIn}
            loading={loading}
            onChangeMode={handleChangeMode}
          />
        ) : (
          <SignUp
            onSubmit={handleSignUp}
            loading={loading}
            onChangeMode={handleChangeMode}
          />
        )
      }
    />
  );
};
