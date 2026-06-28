FROM golang:1.26-alpine AS builder

WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/api ./cmd/api/main.go

FROM alpine:3.21

RUN apk add --no-cache ca-certificates tzdata
RUN adduser -D app

COPY --from=builder /app/api /app/api
USER app

EXPOSE 8080

CMD ["/app/api"]
