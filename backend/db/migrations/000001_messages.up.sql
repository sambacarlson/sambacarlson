CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL,
    subject    TEXT,
    read_at    TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
