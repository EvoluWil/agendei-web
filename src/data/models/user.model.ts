import { IEvent } from './event.model';
import { Reservation } from './reservation.model';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  picture: string;
  role: 'ADMIN' | 'COMMON';
  createdAt: Date;
  updatedAt: Date;
  ownerEvents: IEvent[];
  reservations: Reservation[];
}
