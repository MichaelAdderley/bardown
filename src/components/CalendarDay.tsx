'use client';

import { isToday, isSameDay } from '@/lib/date-utils';
import { CalendarEvent, EventType } from '@/lib/types';
import EventBadge from './EventBadge';

interface CalendarDayProps {
  date: Date;
  currentMonth: number;
  events: CalendarEvent[];
  eventTypes: EventType[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function CalendarDay({
  date,
  currentMonth,
  events,
  eventTypes,
  onDayClick,
  onEventClick,
}: CalendarDayProps) {
  const isCurrentMonth = date.getMonth() === currentMonth;
  const today = isToday(date);

  const dayEvents = events.filter((event) =>
    isSameDay(new Date(event.start_date), date)
  );

  const maxVisible = 3;
  const visibleEvents = dayEvents.slice(0, maxVisible);
  const overflow = dayEvents.length - maxVisible;

  return (
    <div
      onClick={() => onDayClick(date)}
      className="group relative flex min-h-[60px] cursor-pointer flex-col border-b border-r p-1 transition-all sm:min-h-[100px] sm:p-2 lg:min-h-[120px]"
      style={{
        borderColor: 'var(--border-default)',
        background: isCurrentMonth ? 'transparent' : 'var(--surface-default)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--surface-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isCurrentMonth ? 'transparent' : 'var(--surface-default)';
      }}
    >
      <span
        className={`mb-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium sm:h-7 sm:w-7 sm:text-sm ${
          today ? 'glow-accent text-white' : ''
        }`}
        style={
          today
            ? { background: 'var(--accent)' }
            : { color: isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)' }
        }
      >
        {date.getDate()}
      </span>

      {/* Mobile: show dots */}
      <div className="flex gap-0.5 sm:hidden">
        {dayEvents.slice(0, 4).map((event) => (
            <span
              key={event.id}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--text-secondary)' }}
            />
        ))}
        {dayEvents.length > 4 && (
          <span className="text-[8px]" style={{ color: 'var(--text-muted)' }}>+{dayEvents.length - 4}</span>
        )}
      </div>

      {/* Desktop: show event badges */}
      <div className="hidden flex-1 flex-col gap-0.5 overflow-hidden sm:flex">
        {visibleEvents.map((event) => (
          <EventBadge
            key={event.id}
            event={event}
            eventTypes={eventTypes}
            onClick={onEventClick}
          />
        ))}
        {overflow > 0 && (
          <span className="px-1 text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
            +{overflow} more
          </span>
        )}
      </div>
    </div>
  );
}
