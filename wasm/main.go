//go:build wasm

package main

import (
	"fmt"
	"os"
	"syscall/js"
	"time"

	"github.com/masutaka/github-nippou/lib"
)

var sinceDate string
var untilDate string
var debug bool

func list(this js.Value, args []js.Value) interface{} {
	debug = true

	handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		resolve := args[0]
		reject := args[1]

		go func() {
			lines, err := lib.List(sinceDate, untilDate, debug)
			if err != nil {
				fmt.Println(err)
				reject.Invoke()
				os.Exit(1)
			}
			resolve.Invoke(lines)
		}()

		return nil
	})

	return js.Global().Get("Promise").New(handler)
}

func init() {
	nowDate := time.Now().Format("20060102")
	sinceDate = nowDate
	untilDate = nowDate
}

func main() {
	c := make(chan struct{}, 0)

	jsList := js.FuncOf(list)
	js.Global().Set("GithubNippou", jsList)
	js.Global().Get("console").Call("log", "WASM loaded")

	<-c
}
