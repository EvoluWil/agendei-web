import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback
} from 'react';
import { FieldValues } from 'react-hook-form';
import { User } from '../data/models/user.model';
import { UserService } from '../data/services/user.service';

interface UserContextData {
  getUsers: (query: Query) => Promise<User[]>;
  getUser: (userId: string) => Promise<User>;
  updateUser: (userId: string, data: FieldValues) => Promise<void>;
  updateDefaulter: (userId: string, defaulter: boolean) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  createUser: (data: FieldValues) => Promise<User>;
}

type UserContextProps = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextData);

const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const getUsers = useCallback(async (query: Query) => {
    return UserService.getUsers(query);
  }, []);

  const getUser = useCallback(async (userId: string) => {
    return UserService.getUser(userId);
  }, []);

  const createUser = useCallback(async (data: FieldValues) => {
    return UserService.createUser(data);
  }, []);

  const updateUser = useCallback(
    async (userId: string, updatedUser: FieldValues) => {
      return UserService.updateUser(userId, updatedUser);
    },
    []
  );

  const updateDefaulter = useCallback(
    async (userId: string, defaulter: boolean) => {
      return UserService.updateUser(userId, { defaulter });
    },
    []
  );

  const deleteUser = useCallback(async (userId: string) => {
    return UserService.deleteUser(userId);
  }, []);

  const providerValue = useMemo(
    () => ({
      getUsers,
      getUser,
      createUser,
      updateUser,
      deleteUser,
      updateDefaulter
    }),
    [createUser, updateUser, deleteUser, getUsers, getUser, updateDefaulter]
  );
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};

export { useUser, UserProvider };
