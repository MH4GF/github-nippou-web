package middlewares

import (
	"net/http"

	"golang.org/x/exp/slog"
)

func Logging(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		queryParams := r.URL.Query()
		user := queryParams.Get("user")

		slog.Info(
			"logging",
			slog.String("path", r.URL.Path),
			slog.String("method", r.Method),
			slog.String("user", user),
		)

		h(w, r)
	}
}
