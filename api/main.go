package main

import (
	"fmt"
	"mh4gf/github-nippou-web/handlers"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", handlers.RootHandler)
	http.HandleFunc("/healthz", handlers.HealthCheckHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	fmt.Println("Listening on port " + port)
	http.ListenAndServe(addr, nil)
}
