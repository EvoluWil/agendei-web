import { api } from './api';
import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
import { FieldValues } from 'react-hook-form';
import { Reservation } from '../models/reservation.model';

class ReservationServiceClass {
  async getReservations(query: Query) {
    const { data } = await api.get<Reservation[]>('/reservations', {
      params: query,
      paramsSerializer: params => QueryString(params)
    });
    return data;
  }

  async getReservationsRequests(eventId: string) {
    const { data } = await api.get<Reservation[]>(
      `/reservations/requests/${eventId}`
    );
    return data;
  }

  async getReservation(reservationId: string, query: Query) {
    const { data } = await api.get<Reservation>(
      `/reservations/${reservationId}`,
      {
        params: query,
        paramsSerializer: params => QueryString(params)
      }
    );
    return data;
  }

  async createReservation(eventId: string, userId: string) {
    const { data } = await api.post<Reservation>('/reservations', {
      eventId,
      userId
    });
    return data;
  }

  async updateStatus(reservationId: string, status: 'APPROVED' | 'REJECTED') {
    await api.put<Reservation>(`/reservations/${reservationId}`, { status });
  }

  async cancelReservation(reservationId: string) {
    await api.delete(`/reservations/${reservationId}`);
  }
}

export const ReservationService = new ReservationServiceClass();
