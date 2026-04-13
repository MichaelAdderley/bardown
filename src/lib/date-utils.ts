export function getMonthGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay(); // 0=Sun
  const gridStart = new Date(year, month, 1 - startDayOfWeek);

  const weeks: Date[][] = [];
  const current = new Date(gridStart);

  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDateDisplay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export { DAY_NAMES, DAY_NAMES_SHORT };

export interface DayGroup {
  date: Date;
  dayName: string;
  dayNumber: number;
  events: { start_date: string; [key: string]: unknown }[];
}

export function getDaysWithEvents<T extends { start_date: string }>(
  events: T[],
  year: number,
  month: number,
): (Omit<DayGroup, 'events'> & { events: T[] })[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const groups: (Omit<DayGroup, 'events'> & { events: T[] })[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayEvents = events.filter((e) => isSameDay(new Date(e.start_date), date));
    if (dayEvents.length > 0) {
      groups.push({
        date,
        dayName: DAY_NAMES_SHORT[date.getDay()],
        dayNumber: d,
        events: dayEvents,
      });
    }
  }

  return groups;
}
