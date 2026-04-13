'use client';

import { getDaysWithEvents, isToday, formatTime } from '@/lib/date-utils';
import { CalendarEvent, EventType } from '@/lib/types';

interface ScheduleListProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  eventTypes: EventType[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function ScheduleList({
  year,
  month,
  events,
  onDayClick,
  onEventClick,
}: ScheduleListProps) {
  const dayGroups = getDaysWithEvents(events, year, month);

  if (dayGroups.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          No events this month
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {dayGroups.map((group) => {
        const today = isToday(group.date);

        return (
          <div
            key={group.dayNumber}
            className="flex gap-4 px-4 py-3"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            {/* Left: day info */}
            <button
              onClick={() => onDayClick(group.date)}
              className="flex w-12 shrink-0 flex-col items-center pt-0.5"
            >
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: today ? 'var(--accent-default)' : 'var(--text-muted)' }}
              >
                {group.dayName}
              </span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold"
                style={
                  today
                    ? { background: 'var(--accent-default)', color: 'white' }
                    : { color: 'var(--text-primary)' }
                }
              >
                {group.dayNumber}
              </span>
            </button>

            {/* Right: events */}
            <div className="flex flex-1 flex-col gap-2 py-0.5">
              {group.events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="flex flex-col rounded-lg px-3 py-2.5 text-left transition-colors duration-150"
                  style={{
                    background: 'var(--surface-default)',
                    border: '1px solid var(--border-default)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--surface-default)';
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {event.team ? `${event.team} ${event.title}` : event.title}
                  </span>
                  <span
                    className="mt-0.5 text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatTime(event.start_date)}
                    {event.location && ` · ${event.location}`}
                    {event.track && ` · ${event.track}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
