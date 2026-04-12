'use client';

import { formatMonthYear } from '@/lib/date-utils';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onAddEvent: () => void;
}

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  onAddEvent,
}: CalendarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl" style={{ color: 'var(--text-primary)' }}>
          {formatMonthYear(year, month)}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Nav group — arrows + today in one glass pill */}
        <div
          className="flex items-center overflow-hidden rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <button
            onClick={onPrev}
            className="px-2.5 py-2 transition-colors hover:bg-white/[0.06] sm:px-3"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Previous month"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

          <button
            onClick={onToday}
            className="px-3 py-2 text-xs font-medium transition-colors hover:bg-white/[0.06] sm:px-4 sm:text-sm"
            style={{ color: 'var(--text-primary)' }}
          >
            Today
          </button>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

          <button
            onClick={onNext}
            className="px-2.5 py-2 transition-colors hover:bg-white/[0.06] sm:px-3"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Next month"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Add Event — glass pill */}
        <button
          onClick={onAddEvent}
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all hover:bg-white/[0.08] sm:px-4 sm:text-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Event</span>
        </button>
      </div>
    </header>
  );
}
