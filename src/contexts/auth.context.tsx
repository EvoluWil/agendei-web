import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { FieldValues } from 'react-hook-form';
import { User } from '../data/models/user.model';
import { api } from '../data/services/api';
import { AuthService } from '../data/services/auth.service';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  updatePassword: (data: FieldValues) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const storeSession = useCallback((user: User, token: string) => {
    if (token) {
      setCookie('@agendei:token', token, {
        maxAge: 60 * 60 * 24 //expira em 24horas
      });
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { user, token } = await AuthService.signIn(email, password);
      storeSession(user, token);
    },
    [storeSession]
  );

  const updatePassword = useCallback(
    async (data: FieldValues) => {
      return AuthService.updatePassword(data, user?.id || '');
    },
    [user?.id]
  );

  const signOut = useCallback(() => {
    deleteCookie('agendei:token');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = getCookie('@agendei:token');
    if (token) {
      AuthService.getMe(`${token}`).then(user =>
        storeSession(user, `${token}`)
      );
    }
  }, [storeSession]);

  const providerValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
      updatePassword
    }),
    [signIn, signOut, updatePassword, user]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { useAuth, AuthProvider };
