'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, EventType, CreateEventData, UpdateEventData } from '@/lib/types';
import {
  getEventsByMonth,
  getEventTypes,
  createEvent,
  updateEvent,
  deleteEvent,
} from '@/lib/events';

export function useEvents(year: number, month: number) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventsByMonth(year, month);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  const fetchEventTypes = useCallback(async () => {
    try {
      const data = await getEventTypes();
      setEventTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event types');
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEventTypes();
  }, [fetchEventTypes]);

  const addEvent = async (data: CreateEventData) => {
    const newEvent = await createEvent(data);
    setEvents((prev) => [...prev, newEvent].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    ));
    return newEvent;
  };

  const editEvent = async (id: string, data: UpdateEventData) => {
    const updated = await updateEvent(id, data);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    events,
    eventTypes,
    loading,
    error,
    addEvent,
    editEvent,
    removeEvent,
    refetch: fetchEvents,
  };
}
