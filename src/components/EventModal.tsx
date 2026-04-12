'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent, EventType, CreateEventData, UpdateEventData } from '@/lib/types';
import { formatDateForInput } from '@/lib/date-utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateEventData | UpdateEventData) => Promise<void>;
  eventTypes: EventType[];
  event?: CalendarEvent | null;
  defaultDate?: Date | null;
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  eventTypes,
  event,
  defaultDate,
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [track, setTrack] = useState('');
  const [series, setSeries] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [saving, setSaving] = useState(false);

  const isEditing = !!event;
  const selectedType = eventTypes.find((t) => t.name === eventType);
  const isHockey = eventType === 'Hockey';
  const isRacing = eventType === 'Racing';

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventType(event.event_type);
      setTeam(event.team || '');
      setLocation(event.location || '');
      setTrack(event.track || '');
      setSeries(event.series || '');
      const start = new Date(event.start_date);
      setStartDate(formatDateForInput(start));
      setStartTime(
        `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`
      );
    } else {
      setTitle('');
      setEventType(eventTypes[0]?.name || '');
      setTeam('');
      setLocation('');
      setTrack('');
      setSeries('');
      if (defaultDate) {
        setStartDate(formatDateForInput(defaultDate));
      } else {
        setStartDate(formatDateForInput(new Date()));
      }
      setStartTime('12:00');
    }
  }, [event, defaultDate, eventTypes, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType || !startDate) return;
    if (isHockey && (!title.trim() || !team)) return;
    if (isRacing && (!title.trim() || !track.trim())) return;

    setSaving(true);
    try {
      const startDateTime = new Date(`${startDate}T${startTime}:00`).toISOString();

      await onSave({
        title: title.trim(),
        event_type: eventType,
        team: isHockey ? team || undefined : undefined,
        location: isHockey ? location.trim() || undefined : undefined,
        track: isRacing ? track.trim() || undefined : undefined,
        series: isRacing ? series.trim() || undefined : undefined,
        start_date: startDateTime,
      });
      onClose();
    } catch {
      // Error handled by parent
    } finally {
      setSaving(false);
    }
  };

  const isSubmitDisabled =
    saving ||
    !eventType ||
    !startDate ||
    (isHockey && (!title.trim() || !team)) ||
    (isRacing && (!title.trim() || !track.trim()));

  const inputClasses = 'glass-input w-full rounded-xl px-3 py-2.5 text-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="glass-strong relative w-full max-w-md rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {isEditing ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className="glass-button rounded-xl p-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sport Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Sport Type <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map((type) => {
                const selected = eventType === type.name;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      if (type.name !== eventType) {
                        setEventType(type.name);
                        setTeam('');
                        setLocation('');
                        setTrack('');
                        setSeries('');
                        setTitle('');
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                    style={
                      selected
                        ? {
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: 'var(--text-primary)',
                          }
                        : {
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }
                    }
                  >
                    <span>{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Hockey Fields ── */}
          {isHockey && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Leafs vs Habs"
                  className={inputClasses}
                  required
                  autoFocus
                />
              </div>

              {selectedType?.teams?.length ? (
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Team <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedType.teams.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTeam(t.name)}
                        className="rounded-xl px-3 py-2 text-xs font-medium transition-all"
                        style={
                          team === t.name
                            ? {
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: 'var(--text-primary)',
                              }
                            : {
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)',
                              }
                        }
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClasses} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Time</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClasses} />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Scotiabank Arena"
                  className={inputClasses}
                />
              </div>
            </>
          )}

          {/* ── Racing Fields ── */}
          {isRacing && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Monaco Grand Prix"
                  className={inputClasses}
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Track <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  placeholder="e.g. Circuit de Monaco"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClasses} required />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Series</label>
                <input
                  type="text"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  placeholder="e.g. Formula 1, NASCAR, IndyCar"
                  className={inputClasses}
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="glass-button flex-1 rounded-xl px-4 py-2.5 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="glow-accent flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-black transition-all disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: isSubmitDisabled ? 'var(--text-muted)' : '#ffffff' }}
            >
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
