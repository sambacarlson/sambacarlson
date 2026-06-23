package main

import (
	"log"

	"github.com/sambacarlson/backend/internal/database"
	"github.com/sambacarlson/backend/internal/server"
)

func main() {
	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	s := server.NewServer(db)
	log.Println("Starting server on :8080")
	if err := s.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}