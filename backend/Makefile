.PHONY: build run test migrate migrate-down create-migration sqlc tidy

build:
	go build -o bin/api cmd/api/main.go

run:
	go run cmd/api/main.go

test:
	go test ./... -v

MIGRATE_CMD = migrate -path db/migrations -database "$(DB_URL)"

migrate:
	$(MIGRATE_CMD) up

migrate-down:
	$(MIGRATE_CMD) down 1

create-migration:
	@test -n "$(name)" || (echo "Usage: make create-migration name=foo"; exit 1)
	migrate create -ext sql -dir db/migrations -seq $(name)

sqlc:
	cd db && sqlc generate

tidy:
	go mod tidy
