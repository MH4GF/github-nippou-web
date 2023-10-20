package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/MH4GF/github-nippou/lib"
)

type ResponseBody struct {
	Result string `json:"result"`
}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	user := queryParams.Get("user")
	token := queryParams.Get("token")
	settingsGistId := queryParams.Get("settings_gist_id")
	debug := false
	nowDate := time.Now().Format("20060102")
	sinceDate := nowDate
	untilDate := nowDate
	auth := lib.Auth{
		User:           user,
		AccessToken:    token,
		SettingsGistId: settingsGistId,
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
