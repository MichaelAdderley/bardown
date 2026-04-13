'use client';

import { useState, useCallback } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent } from '@/lib/types';
import CalendarHeader from '@/components/CalendarHeader';
import Calendar from '@/components/Calendar';
import EventDetailReadOnly from '@/components/EventDetailReadOnly';

export default function ViewCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);

  const { events, eventTypes, loading, error } =
    useEvents(currentYear, currentMonth);

  const goToPrev = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  }, []);

  const handleEventClick = (event: CalendarEvent) => {
    setViewingEvent(event);
  };

  // Day clicks do nothing in view-only mode
  const handleDayClick = () => {};

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <div>
        <div className="mx-auto max-w-7xl">
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
            readOnly
          />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-2 pb-2 sm:px-4 sm:pb-4 lg:px-8 lg:pb-6">
        {error && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: 'var(--error-subtle)', border: '1px solid var(--error-border)', color: 'var(--error)' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading events...
            </div>
          </div>
        ) : (
          <Calendar
            year={currentYear}
            month={currentMonth}
            events={events}
            eventTypes={eventTypes}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        )}
      </main>

      {viewingEvent && (
        <EventDetailReadOnly
          event={viewingEvent}
          eventTypes={eventTypes}
          onClose={() => setViewingEvent(null)}
        />
      )}
    </div>
  );
}
