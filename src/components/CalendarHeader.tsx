'use client';

import { formatMonthYear } from '@/lib/date-utils';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  readOnly?: boolean;
}

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  readOnly,
}: CalendarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          {formatMonthYear(year, month)}
        </h1>
        {readOnly && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
            style={{
              background: 'var(--surface-default)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-default)',
            }}
          >
            View Only
          </span>
        )}
      </div>

      {/* Nav pill */}
      <div
        className="flex items-center overflow-hidden rounded-full"
        style={{
          background: 'var(--surface-default)',
          border: '1px solid var(--border-strong)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <button
          onClick={onPrev}
          className="px-2.5 py-1.5 transition-colors sm:px-3"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Previous month"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div style={{ width: '1px', height: '16px', background: 'var(--border-strong)' }} />

        <button
          onClick={onToday}
          className="px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Today
        </button>

        <div style={{ width: '1px', height: '16px', background: 'var(--border-strong)' }} />

        <button
          onClick={onNext}
          className="px-2.5 py-1.5 transition-colors sm:px-3"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Next month"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
