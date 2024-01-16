package handler

import (
	"encoding/json"
	"net/http"

	"github.com/masutaka/github-nippou/v4/lib"
	"golang.org/x/exp/slog"
)

func logging(r *http.Request) {
	queryParams := r.URL.Query()
	user := queryParams.Get("user")

	slog.Info(
		"logging",
		slog.String("path", r.URL.Path),
		slog.String("method", r.Method),
		slog.String("user", user),
	)
}

type ResponseBody struct {
	Result string `json:"result"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	logging(r)

	queryParams := r.URL.Query()
	user := queryParams.Get("user")
	token := queryParams.Get("token")
	settingsGistId := queryParams.Get("settings_gist_id")
	debug := false
	sinceDate := queryParams.Get("since_date")
	untilDate := queryParams.Get("until_date")

	list := lib.NewList(sinceDate, untilDate, user, token, settingsGistId, debug)
	lines, err := list.Collect()
	if err != nil {
		slog.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
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
