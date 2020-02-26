package main

import (
    "fmt"
    "net/http"
    "log"
	"encoding/json"

    "github.com/julienschmidt/httprouter"
)


func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, "Welcome! But this is an API Server.\n")
}

func registerAccount(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")

	printJsonResponse(w, r, "{ret: hi}")
}

func reportAccident(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")

    //fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
	printJsonResponse(w, r, "{ret: hi}")
}

func listAccident(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")

	printJsonResponse(w, r, "{ret: hi}")
}

func printJsonResponse(out http.ResponseWriter, in *http.Request, response interface{}) {
	json, err := json.Marshal(response)
	if err != nil {
		log.Println("500 " + in.URL.String())
		//printJsonError(out, in, 500, "Json marshal failed")
	} else {
		log.Println("200 " + in.URL.String())
		fmt.Fprintf(out, "%s", json)
	}
}


func main() {
    router := httprouter.New()

    router.GET("/", Index)
	router.GET("/register", registerAccount)
    router.GET("/report", reportAccident)
    router.GET("/list", listAccident)

    log.Fatal(http.ListenAndServe(":8080", router))
}
