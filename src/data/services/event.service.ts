import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
import { IEvent } from '../models/event.model';
import { api } from './api';

class EventServiceClass {
  async getEvents(query: Query) {
    const { data } = await api.get<IEvent[]>('/events', {
      params: query,
      paramsSerializer: { encode: params => QueryString(params) }
    });
    return data;
  }

  async getEvent(eventId: string, query: Query) {
    const { data } = await api.get<IEvent>(`/events/${eventId}`, {
      params: query,
      paramsSerializer: { encode: params => QueryString(params) }
    });
    return data;
  }

  async createEvent(newEvent: { [x: string]: any }) {
    const { data } = await api.post<Event>('/events', newEvent);
    return data;
  }

  async updateEvent(eventId: string, updateData: { [x: string]: any }) {
    const { data } = await api.put<Event>(`/events/${eventId}`, updateData);
    return data;
  }

  async deleteEvent(eventId: string) {
    const { data } = await api.delete<Event>(`/events/${eventId}`);
    return data;
  }
}

export const EventService = new EventServiceClass();
