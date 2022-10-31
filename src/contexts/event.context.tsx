import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback
} from 'react';
import { FieldValues } from 'react-hook-form';
import { IEvent } from '../data/models/event.model';
import { EventService } from '../data/services/event.service';

interface EventContextData {
  getEvents: (query: Query) => Promise<IEvent[]>;
  getEvent: (eventId: string, query: Query) => Promise<IEvent>;
  updateEvent: (eventId: string, data: FieldValues) => Promise<IEvent>;
  deleteEvent: (eventId: string) => Promise<IEvent>;
  createEvent: (data: FieldValues) => Promise<IEvent>;
}

type EventContextProps = {
  children: ReactNode;
};

const EventContext = createContext({} as EventContextData);

const EventProvider: React.FC<EventContextProps> = ({ children }) => {
  const getEvents = useCallback(async (query: Query) => {
    return EventService.getEvents(query);
  }, []);

  const getEvent = useCallback(async (eventId: string, query: Query) => {
    return EventService.getEvent(eventId, query);
  }, []);

  const createEvent = useCallback(async (data: FieldValues) => {
    return EventService.createEvent(data);
  }, []);

  const updateEvent = useCallback(
    async (eventId: string, updatedEvent: FieldValues) => {
      return EventService.updateEvent(eventId, updatedEvent);
    },
    []
  );

  const updateDefaulter = useCallback(
    async (eventId: string, defaulter: boolean) => {
      return EventService.updateEvent(eventId, { defaulter });
    },
    []
  );

  const deleteEvent = useCallback(async (eventId: string) => {
    return EventService.deleteEvent(eventId);
  }, []);

  const providerValue = useMemo(
    () => ({
      getEvents,
      getEvent,
      createEvent,
      updateEvent,
      deleteEvent
    }),
    [createEvent, updateEvent, deleteEvent, getEvents, getEvent]
  );
  return (
    <EventContext.Provider value={providerValue}>
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }

  return context;
};

export { useEvent, EventProvider };
