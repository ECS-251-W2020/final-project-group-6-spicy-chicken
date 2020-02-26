package main

import (
    "log"
    "fmt"
	"strconv"

    "net/http"
	"encoding/json"

    "github.com/julienschmidt/httprouter"
)

type Geolocation struct {
	Latitude	float64
	Longitute	float64
/*
	Heading
	Speed
*/
}

type Incident struct {
	AccountId	int
	UserName	string
	Location	Geolocation
	Verified		bool
}

const GEO_PREC = 8;
var DB  = initDB();

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, asciiChicken())
    fmt.Fprint(w, "Welcome! But this is an API Server.\n")
}

func registerAccount(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")
	printJsonResponse(w, r, "{ret: notYetImplelmented}")
}

func reportAccident(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	//reportAccident requires accountId, geo lat, geo long

	err := r.ParseForm()
	if err != nil {
		panic(err)
	}
	fmt.Println(r.Form)

	// Bail if account not found. XXX Do something smarter here
	accountId, err := strconv.Atoi(r.Form.Get("accountId"))
	if err != nil {
		printJsonError(w, r, 400, "Invalid account id" + err.Error())
		return
	}

	lat, err:= strconv.ParseFloat(r.Form.Get("latitude"), GEO_PREC);
	if err != nil {
		printJsonError(w, r, 400, "Geolocation - latitude")

	}

	long, err:= strconv.ParseFloat(r.Form.Get("longitude"), GEO_PREC);
	if err != nil {
		printJsonError(w, r, 400, "Geolocation - longitude")

	}

	var incidentLocation = Geolocation{
		Latitude:  lat,
		Longitute:  long,
	}

	// Enter it into the backing store
	var newIncident = Incident{
		AccountId: accountId,
		UserName: "",
		Location: incidentLocation,
		Verified: false,
	}
    addAlarm(DB, newIncident);

    // Enter to Block chain

	w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, "hello, %s!\n", params.ByName("name"))
	printJsonResponse(w, r, newIncident)

}

func listAccident(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")
	printJsonResponse(w, r, DB.Items())

}

// printers
func keyValueJson(key string, value string) string {
	return fmt.Sprintf(`{"` + key + `":"` + value + `"}`)
}

func printJsonKeyValueResponse(responseWriter http.ResponseWriter, request *http.Request, key string, value string) {
	log.Println("200 " + request.URL.String())
	fmt.Fprintf(responseWriter, keyValueJson(key, value))
}

func printJsonError(responseWriter http.ResponseWriter, request *http.Request, statusCode int, errorMessage string) {
	log.Println(fmt.Sprintf("%d %s", statusCode, request.URL.String()))
	responseWriter.WriteHeader(statusCode)
	fmt.Fprintf(responseWriter, keyValueJson("Error", errorMessage))
}

func printJsonResponse(out http.ResponseWriter, in *http.Request, response interface{}) {
	json, err := json.Marshal(response)
	if err != nil {
		log.Println("500 " + in.URL.String())
		printJsonError(out, in, 500, "Json marshal failed")
	} else {
		log.Println("200 " + in.URL.String())
		fmt.Fprintf(out, "%s", json)
	}
}


func main() {
    router := httprouter.New()

    router.GET("/", Index)
	router.GET("/register", registerAccount)
    router.POST("/report", reportAccident)
    router.GET("/list", listAccident)

    fmt.Println("Starting webserver....")
    log.Fatal(http.ListenAndServe(":80", router))
}
