'use client';

import { getMonthGrid, DAY_NAMES } from '@/lib/date-utils';
import { CalendarEvent, EventType } from '@/lib/types';
import CalendarDay from './CalendarDay';

interface CalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  eventTypes: EventType[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function Calendar({
  year,
  month,
  events,
  eventTypes,
  onDayClick,
  onEventClick,
}: CalendarProps) {
  const weeks = getMonthGrid(year, month);

  return (
    <div className="glass flex flex-1 flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
      {/* Day headers */}
      <div className="grid grid-cols-7" style={{ borderBottom: '1px solid var(--border-default)' }}>
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wider sm:px-2 sm:py-3 sm:text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="sm:hidden">{day.charAt(0)}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Week rows */}
      <div className="flex flex-1 flex-col">
        {weeks.map((week, i) => (
          <div key={i} className="grid flex-1 grid-cols-7">
            {week.map((date, j) => (
              <CalendarDay
                key={j}
                date={date}
                currentMonth={month}
                events={events}
                eventTypes={eventTypes}
                onDayClick={onDayClick}
                onEventClick={onEventClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
