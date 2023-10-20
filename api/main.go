package main

import (
	"mh4gf/github-nippou-web/handlers"
	"mh4gf/github-nippou-web/middlewares"
	"net/http"
	"os"

	"golang.org/x/exp/slog"
)

func main() {
	http.HandleFunc("/", middlewares.Logging(handlers.RootHandler))
	http.HandleFunc("/healthz", handlers.HealthCheckHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	slog.Info("Listening on port " + port)
	if err := http.ListenAndServe(addr, nil); err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
}

func init() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)
}
