import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback
} from 'react';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import { FieldValues } from 'react-hook-form';
import { add, setHours } from 'date-fns';
import { Reservation } from '../data/models/reservation.model';
import { useAuth } from './auth.context';
import { ReservationService } from '../data/services/reservation.service';

interface ReservationContextData {
  createReservation: (eventId: string, userId: string) => Promise<Reservation>;
  getReservations: (query: Query) => Promise<Reservation[]>;
  getReservation: (reservationId: string, query: Query) => Promise<Reservation>;
  getReservationsRequests: (eventId: string) => Promise<Reservation[]>;
  updateStatus: (
    reservationId: string,
    status: 'APPROVED' | 'REJECTED'
  ) => Promise<void>;
  cancelReservation: (reservationId: string) => Promise<void>;
}

type ReservationContextProps = {
  children: ReactNode;
};

const ReservationContext = createContext({} as ReservationContextData);

const ReservationProvider: React.FC<ReservationContextProps> = ({
  children
}) => {
  const createReservation = useCallback(
    async (eventId: string, userId: string) => {
      return ReservationService.createReservation(eventId, userId);
    },
    []
  );

  const getReservationsRequests = useCallback(async (eventId: string) => {
    return ReservationService.getReservationsRequests(eventId);
  }, []);

  const getReservations = useCallback(async (query: Query) => {
    return ReservationService.getReservations(query);
  }, []);

  const getReservation = useCallback(
    async (reservationId: string, query: Query) => {
      return ReservationService.getReservation(reservationId, query);
    },
    []
  );

  const updateStatus = useCallback(
    async (reservationId: string, status: 'APPROVED' | 'REJECTED') => {
      return ReservationService.updateStatus(reservationId, status);
    },
    []
  );

  const cancelReservation = useCallback(async (reservationId: string) => {
    return ReservationService.cancelReservation(reservationId);
  }, []);

  const providerValue = useMemo(
    () => ({
      createReservation,
      getReservations,
      getReservation,
      updateStatus,
      cancelReservation,
      getReservationsRequests
    }),
    [
      createReservation,
      getReservations,
      getReservation,
      updateStatus,
      cancelReservation,
      getReservationsRequests
    ]
  );
  return (
    <ReservationContext.Provider value={providerValue}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error(
      'useReservation must be used within an ReservationProvider'
    );
  }

  return context;
};

export { useReservation, ReservationProvider };
