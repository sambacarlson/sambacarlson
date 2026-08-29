package main

import (
	"log"
	"os"

	"github.com/sambacarlson/backend/internal/database"
	"github.com/sambacarlson/backend/internal/server"
)

func main() {
	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	s := server.NewServer(db)
	log.Printf("Starting server on :%s", port)
	if err := s.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}