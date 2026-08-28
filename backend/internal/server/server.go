package server

import (
	"os"
	"strings"

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
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins(),
		AllowMethods:     []string{"GET", "POST", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	h := handlers.New(db)

	router.GET("/healthz", h.HealthCheck)

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

func allowedOrigins() []string {
	raw := os.Getenv("ALLOWED_ORIGINS")
	if raw == "" {
		return []string{"http://localhost:3000"}
	}

	origins := strings.Split(raw, ",")
	for i, o := range origins {
		origins[i] = strings.TrimSpace(o)
	}
	return origins
}

func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}
