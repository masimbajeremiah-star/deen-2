-- DAWALINK foundation migration (PostgreSQL)
-- Apply only after reviewing in a staging database. Avoid real patient data until auth/privacy safeguards are live.

CREATE TABLE IF NOT EXISTS pharmacy_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id text NOT NULL REFERENCES pharmacies(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('OWNER','PHARMACIST','STAFF')),
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('ADMIN','VERIFIER')),
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id text NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  actor_type text NOT NULL CHECK (actor_type IN ('PATIENT','PHARMACY','ADMIN','SYSTEM')),
  actor_id text,
  old_status text,
  new_status text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_type text NOT NULL,
  actor_id text,
  action text NOT NULL,
  target_type text,
  target_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS stocks_confirmed_idx ON stocks(last_confirmed_at);
CREATE INDEX IF NOT EXISTS reservations_pharmacy_created_idx ON reservations(pharmacy_id,created_at DESC);
CREATE INDEX IF NOT EXISTS reservation_events_reservation_idx ON reservation_events(reservation_id,created_at);
CREATE INDEX IF NOT EXISTS audit_events_created_idx ON audit_events(created_at DESC);

-- Stock freshness is informational; clients must display last-confirmed timestamps.
-- Do not use these tables for real patient data until access controls and privacy review are complete.
