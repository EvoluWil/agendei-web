import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
import { FieldValues } from 'react-hook-form';
import { IEvent } from '../models/event.model';
import { api } from './api';

class EventServiceClass {
  async getEvents(query: Query) {
    const { data } = await api.get<IEvent[]>('/events', {
      params: query,
      paramsSerializer: params => QueryString(params)
    });
    return data;
  }

  async getEvent(eventId: string, query: Query) {
    const { data } = await api.get<IEvent>(`/events/${eventId}`, {
      params: query,
      paramsSerializer: params => QueryString(params)
    });
    return data;
  }

  async createEvent(newEvent: FieldValues) {
    const { data } = await api.post<IEvent>('/events', newEvent);
    return data;
  }

  async updateEvent(eventId: string, updateData: FieldValues) {
    const { data } = await api.put<IEvent>(`/events/${eventId}`, updateData);
    return data;
  }

  async deleteEvent(eventId: string) {
    const { data } = await api.delete<IEvent>(`/events/${eventId}`);
    return data;
  }
}

export const EventService = new EventServiceClass();
