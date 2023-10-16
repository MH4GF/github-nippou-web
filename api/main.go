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

func handler(w http.ResponseWriter, r *http.Request) {
	debug := true
	nowDate := time.Now().Format("20060102")
	sinceDate := nowDate
	untilDate := nowDate
	auth := lib.Auth{
		User:        "MH4GF",
		AccessToken: os.Getenv("GITHUB_NIPPOU_ACCESS_TOKEN"),
	}

	lines, err := lib.List(sinceDate, untilDate, debug, auth)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	body := ResponseBody{Result: lines}
	fmt.Println(body)

	jsonData, err := json.Marshal(body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// レスポンスヘッダーの設定
	w.Header().Set("Content-Type", "application/json")

	// JSONデータをクライアントに送信
	w.Write(jsonData)
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(os.Getenv("PORT"), nil)
}
