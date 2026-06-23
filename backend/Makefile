.PHONY: build run test migrate sqlc tidy

build:
	go build -o bin/api cmd/api/main.go

run:
	go run cmd/api/main.go

test:
	go test ./... -v

migrate:
	psql $(DB_URL) -f db/migrations/001_messages.sql

sqlc:
	cd db && sqlc generate

tidy:
	go mod tidy