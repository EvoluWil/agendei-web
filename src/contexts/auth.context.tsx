import { getCookie, setCookie } from 'cookies-next';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { User } from '../data/models/user.model';
import { api } from '../data/services/api';
import { AuthService } from '../data/services/auth.service';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const storeSession = useCallback((user: User, token: string) => {
    if (token) {
      setCookie('@mare-mansa:token', token, {
        maxAge: 60 * 60 * 24 //expira em 24horas
      });
    }
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    setUser(user);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { user, token } = await AuthService.signIn(email, password);
      storeSession(user, token);
    },
    [storeSession]
  );

  useEffect(() => {
    const token = getCookie('@mare-mansa:token');
    if (token) {
      AuthService.getMe(`${token}`).then(user =>
        storeSession(user, `${token}`)
      );
    }
  }, [storeSession]);

  const providerValue = useMemo(
    () => ({
      signIn,
      user
    }),
    [signIn, user]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
