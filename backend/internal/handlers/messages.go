package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sambacarlson/backend/internal/database"
)

type Handler struct {
	db *database.DB
}

func New(db *database.DB) *Handler {
	return &Handler{db: db}
}

type CreateMessageRequest struct {
	Name    string `json:"name"    binding:"required"`
	Email   string `json:"email"   binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

type MessageResponse struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Message   string `json:"message"`
	CreatedAt string `json:"created_at"`
}

func (h *Handler) CreateMessage(c *gin.Context) {
	var req CreateMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO messages (name, email, message)
		VALUES ($1, $2, $3)
		RETURNING id, name, email, message, created_at
	`

	var resp MessageResponse
	err := h.db.Pool.QueryRow(
		context.Background(),
		query,
		req.Name, req.Email, req.Message,
	).Scan(&resp.ID, &resp.Name, &resp.Email, &resp.Message, &resp.CreatedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message"})
		return
	}

	c.JSON(http.StatusCreated, resp)
}