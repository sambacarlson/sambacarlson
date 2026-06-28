package database

import (
	"context"
	"fmt"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/sambacarlson/backend/db/migrations"
)

type DB struct {
	Pool *pgxpool.Pool
}

func New() (*DB, error) {
	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:postgres@localhost:5470/sambacarlson?sslmode=disable"
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	if err := runMigrations(dbURL); err != nil {
		return nil, fmt.Errorf("migration failed: %w", err)
	}

	return &DB{Pool: pool}, nil
}

func runMigrations(dbURL string) error {
	src, err := iofs.New(migrations.FS, ".")
	if err != nil {
		return fmt.Errorf("failed to create migration source: %w", err)
	}

	m, err := migrate.NewWithSourceInstance("iofs", src, dbURL)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("failed to apply migrations: %w", err)
	}

	srcErr, dbErr := m.Close()
	if srcErr != nil {
		return fmt.Errorf("failed to close migration source: %w", srcErr)
	}
	if dbErr != nil {
		return fmt.Errorf("failed to close migration database: %w", dbErr)
	}

	return nil
}
