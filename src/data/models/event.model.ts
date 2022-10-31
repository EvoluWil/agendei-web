import { Reservation } from './reservation.model';
import { User } from './user.model';

export interface IEvent {
  owner: User;
  reservations: Reservation[];
  id: string;
  slug: string;
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  description: string;
  address: string;
  state: string;
  district: string;
  city: string;
  value: number;
  limit: number;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
