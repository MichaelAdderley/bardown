'use client';

import { useState, useCallback } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent, CreateEventData, UpdateEventData } from '@/lib/types';
import CalendarHeader from '@/components/CalendarHeader';
import Calendar from '@/components/Calendar';
import EventModal from '@/components/EventModal';
import EventDetail from '@/components/EventDetail';
import DeleteConfirm from '@/components/DeleteConfirm';

export default function Home() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const { events, eventTypes, loading, error, addEvent, editEvent, removeEvent } =
    useEvents(currentYear, currentMonth);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | null>(null);

  // Detail state
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);

  // Delete state
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null);

  // Navigation
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

  // Event handlers
  const handleDayClick = (date: Date) => {
    setEditingEvent(null);
    setDefaultDate(date);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setViewingEvent(event);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setDefaultDate(null);
    setModalOpen(true);
  };

  const handleEdit = () => {
    if (viewingEvent) {
      setEditingEvent(viewingEvent);
      setViewingEvent(null);
      setModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (viewingEvent) {
      setDeletingEvent(viewingEvent);
      setViewingEvent(null);
    }
  };

  const handleSave = async (data: CreateEventData | UpdateEventData) => {
    if (editingEvent) {
      await editEvent(editingEvent.id, data);
    } else {
      await addEvent(data as CreateEventData);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingEvent) {
      await removeEvent(deletingEvent.id);
      setDeletingEvent(null);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      {/* Top bar */}
      <div>
        <div className="mx-auto max-w-7xl">
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
          />
        </div>
      </div>

      {/* Calendar */}
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

      {/* Modals */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        eventTypes={eventTypes}
        event={editingEvent}
        defaultDate={defaultDate}
      />

      {viewingEvent && (
        <EventDetail
          event={viewingEvent}
          eventTypes={eventTypes}
          onClose={() => setViewingEvent(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {deletingEvent && (
        <DeleteConfirm
          eventTitle={deletingEvent.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingEvent(null)}
        />
      )}
    </div>
  );
}
