-- Bardown: Sporting Events Calendar
-- Initial schema migration

-- Event types reference table
CREATE TABLE IF NOT EXISTS event_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  color text NOT NULL,
  icon text
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL REFERENCES event_types(name),
  team text,
  location text,
  track text,
  series text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  color text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for efficient month-based queries
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed default event types
INSERT INTO event_types (name, color, icon) VALUES
  ('Hockey', '#888888', NULL),
  ('Racing', '#888888', NULL)
ON CONFLICT (name) DO NOTHING;
