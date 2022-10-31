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
  getUser: (userId: string, query: Query) => Promise<User>;
  updateUser: (userId: string, data: FieldValues) => Promise<void>;
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

  const getUser = useCallback(async (userId: string, query: Query) => {
    return UserService.getUser(userId, query);
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

  const deleteUser = useCallback(async (userId: string) => {
    return UserService.deleteUser(userId);
  }, []);

  const providerValue = useMemo(
    () => ({
      getUsers,
      getUser,
      createUser,
      updateUser,
      deleteUser
    }),
    [createUser, updateUser, deleteUser, getUsers, getUser]
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
