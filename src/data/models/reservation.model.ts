import { IEvent } from './event.model';
import { User } from './user.model';

export interface Reservation {
  id: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELED';
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  userId: string;
  eventId: string;
  user: User;
  event: IEvent;
}

export const ReservationStatusLabel = {
  APPROVED: { label: 'Aprovada', color: 'success.main' },
  CANCELED: { label: 'Cancelada', color: 'grey.400' },
  REJECTED: { label: 'Rejeitada', color: 'error.main' },
  PENDING: { label: 'Pendente', color: 'white' }
};
