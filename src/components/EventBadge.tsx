'use client';

import { CalendarEvent, EventType } from '@/lib/types';

interface EventBadgeProps {
  event: CalendarEvent;
  eventTypes: EventType[];
  onClick: (event: CalendarEvent) => void;
}

export default function EventBadge({ event, onClick }: EventBadgeProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className="group flex w-full items-center gap-1 rounded-lg px-1.5 py-0.5 text-left text-[10px] font-medium transition-all sm:text-xs"
      style={{
        background: 'var(--surface-default)',
        borderLeft: '2px solid var(--border-focus)',
        color: 'var(--text-secondary)',
      }}
      title={event.title}
    >
      <span className="truncate">
        {event.team ? `${event.team} ${event.title}` : event.title}
      </span>
    </button>
  );
}
