package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sambacarlson/backend/internal/database"
	"github.com/sambacarlson/backend/internal/handlers"
)

type Server struct {
	db     *database.DB
	router *gin.Engine
}

func NewServer(db *database.DB) *Server {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://sambacarlson.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	h := handlers.New(db)

	api := router.Group("/api")
	{
		api.POST("/messages", h.CreateMessage)
		api.PATCH("/messages/:id/read", h.MarkMessageRead)
	}

	return &Server{
		db:     db,
		router: router,
	}
}

func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}
