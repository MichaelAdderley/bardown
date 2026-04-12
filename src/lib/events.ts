import { supabase } from './supabase';
import { CalendarEvent, CreateEventData, EventType, UpdateEventData } from './types';

// ── Hockey teams (client-side, not stored in DB) ──
const HOCKEY_TEAMS = [
  { id: 't1', name: 'Reapers' },
  { id: 't2', name: 'Steel' },
  { id: 't3', name: 'Cobras' },
  { id: 't4', name: 'IHC' },
];

export async function getEventTypes(): Promise<EventType[]> {
  const { data, error } = await supabase
    .from('event_types')
    .select('*')
    .order('name');

  if (error) throw error;

  // Attach teams to Hockey type
  return data.map((type: EventType) => ({
    ...type,
    teams: type.name === 'Hockey' ? HOCKEY_TEAMS : undefined,
  }));
}

export async function getEventsByMonth(year: number, month: number): Promise<CalendarEvent[]> {
  const startOfMonth = new Date(year, month, 1).toISOString();
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', startOfMonth)
    .lte('start_date', endOfMonth)
    .order('start_date');

  if (error) throw error;
  return data;
}

export async function createEvent(eventData: CreateEventData): Promise<CalendarEvent> {
  const { data, error } = await supabase
    .from('events')
    .insert(eventData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, eventData: UpdateEventData): Promise<CalendarEvent> {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
