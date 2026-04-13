'use client';

import { CalendarEvent, EventType } from '@/lib/types';
import { formatDateDisplay, formatTime } from '@/lib/date-utils';

interface EventDetailReadOnlyProps {
  event: CalendarEvent;
  eventTypes: EventType[];
  onClose: () => void;
}

export default function EventDetailReadOnly({
  event,
  eventTypes,
  onClose,
}: EventDetailReadOnlyProps) {
  const eventType = eventTypes.find((t) => t.name === event.event_type);
  const icon = eventType?.icon || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="glass-strong relative w-full max-w-sm rounded-2xl shadow-2xl shadow-black/40">
        <div className="p-5">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                {icon && <span className="text-lg">{icon}</span>}
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: 'var(--surface-default)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-strong)',
                  }}
                >
                  {event.event_type}
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
              {event.team && (
                <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{event.team}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="glass-button ml-2 rounded-xl p-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Info rows */}
          <div className="-mx-2 space-y-0.5">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <svg className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDateDisplay(event.start_date)}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <svg className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {formatTime(event.start_date)}
                {event.end_date && ` - ${formatTime(event.end_date)}`}
              </span>
            </div>

            {/* Location — opens Google Maps */}
            {event.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <svg className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </a>
            )}

            {/* Track (Racing) */}
            {event.track && (
              <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>{event.track}</span>
              </div>
            )}

            {/* Series (Racing) */}
            {event.series && (
              <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <span>{event.series}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
