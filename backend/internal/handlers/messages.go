package handlers

import (
	"context"
	"net/http"
	"strconv"
	"time"

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
	Name    string  `json:"name"    binding:"required"`
	Email   string  `json:"email"   binding:"required,email"`
	Message string  `json:"message" binding:"required"`
	Subject *string `json:"subject"`
}

type MessageResponse struct {
	ID        int        `json:"id"`
	Name      string     `json:"name"`
	Email     string     `json:"email"`
	Message   string     `json:"message"`
	Subject   *string    `json:"subject"`
	ReadAt    *time.Time `json:"read_at"`
	CreatedAt time.Time  `json:"created_at"`
}

func (h *Handler) CreateMessage(c *gin.Context) {
	var req CreateMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO messages (name, email, message, subject)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, email, message, subject, read_at, created_at
	`

	var resp MessageResponse
	err := h.db.Pool.QueryRow(
		context.Background(),
		query,
		req.Name, req.Email, req.Message, req.Subject,
	).Scan(&resp.ID, &resp.Name, &resp.Email, &resp.Message, &resp.Subject, &resp.ReadAt, &resp.CreatedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message"})
		return
	}

	c.JSON(http.StatusCreated, resp)
}

func (h *Handler) MarkMessageRead(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid message ID"})
		return
	}

	query := `
		UPDATE messages
		SET read_at = NOW()
		WHERE id = $1 AND read_at IS NULL
		RETURNING id, name, email, message, subject, read_at, created_at
	`

	var resp MessageResponse
	err = h.db.Pool.QueryRow(
		context.Background(),
		query,
		id,
	).Scan(&resp.ID, &resp.Name, &resp.Email, &resp.Message, &resp.Subject, &resp.ReadAt, &resp.CreatedAt)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Message not found or already read"})
		return
	}

	c.JSON(http.StatusOK, resp)
}
