package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/MH4GF/github-nippou/lib"
)

type ResponseBody struct {
	Result string `json:"result"`
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "OK")
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	user := queryParams.Get("user")
	token := queryParams.Get("token")
	debug := false
	nowDate := time.Now().Format("20060102")
	sinceDate := nowDate
	untilDate := nowDate
	auth := lib.Auth{
		User:        user,
		AccessToken: token,
	}

	lines, err := lib.List(sinceDate, untilDate, debug, auth)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	body := ResponseBody{Result: lines}

	jsonData, err := json.Marshal(body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// レスポンスヘッダーの設定
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "max-age=60")

	// JSONデータをクライアントに送信
	w.Write(jsonData)
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/healthz", healthCheckHandler)
	port := os.Getenv("PORT")
	addr := ":" + port
	fmt.Println("Listening on port " + port)
	http.ListenAndServe(addr, nil)
}
