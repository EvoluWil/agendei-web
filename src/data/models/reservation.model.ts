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
