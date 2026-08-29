package server

import (
	"os"
	"reflect"
	"testing"
)

func TestAllowedOrigins_DefaultsToLocalhostWhenUnset(t *testing.T) {
	os.Unsetenv("ALLOWED_ORIGINS")

	got := allowedOrigins()
	want := []string{"http://localhost:3000"}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("allowedOrigins() = %v, want %v", got, want)
	}
}

func TestAllowedOrigins_ParsesCommaSeparatedList(t *testing.T) {
	t.Setenv("ALLOWED_ORIGINS", "https://a.example.com, https://b.example.com")

	got := allowedOrigins()
	want := []string{"https://a.example.com", "https://b.example.com"}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("allowedOrigins() = %v, want %v", got, want)
	}
}

func TestAllowedOrigins_SkipsEmptyEntries(t *testing.T) {
	t.Setenv("ALLOWED_ORIGINS", "https://a.example.com, ,")

	got := allowedOrigins()
	want := []string{"https://a.example.com"}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("allowedOrigins() = %v, want %v", got, want)
	}
}
