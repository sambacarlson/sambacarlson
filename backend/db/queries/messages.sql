-- name: CreateMessage :one
INSERT INTO messages (name, email, message)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetAllMessages :many
SELECT * FROM messages
ORDER BY created_at DESC;