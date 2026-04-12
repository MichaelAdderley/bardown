export interface EventType {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  teams?: Team[];
}

export interface Team {
  id: string;
  name: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  team: string | null;
  location: string | null;
  track: string | null;
  series: string | null;
  start_date: string;
  end_date: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  event_type: string;
  team?: string;
  location?: string;
  track?: string;
  series?: string;
  start_date: string;
  end_date?: string;
  color?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {}
