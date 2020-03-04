package main

import (
    "log"
    "fmt"
    "strconv"

    "net/http"
    "encoding/json"

    "github.com/julienschmidt/httprouter"
)

type Incident struct {
    AuthToken   string
    Latitude    float64
    Longitude   float64
    Speed       int
    Heading     int
    Timestamp   float64
    Verified    bool
}

var FSClient, FSCTX, err = initFireStoreClient();


func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, asciiChicken())
    fmt.Fprint(w, "Welcome! But this is an API Server.\n")
}

func reportAccident(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
    //reportAccident requires accountId, geo lat, geo long

    err := r.ParseForm()
    if err != nil {
        panic(err)
    }
    fmt.Println(r.Form)

    // Bail if account not found. XXX Do something smarter here
    authToken := r.Form.Get("authToken")

    lat, err:= strconv.ParseFloat(r.Form.Get("latitude"), 32);
    if err != nil {
        printJsonError(w, r, 400, "Invalid Geolocation - latitude")

    }

    long, err:= strconv.ParseFloat(r.Form.Get("longitude"), 32);
    if err != nil {
        printJsonError(w, r, 400, "Invalid Geolocation - longitude")

    }

    timestamp, err := strconv.ParseFloat(r.Form.Get("timestamp"), 32);
    if err != nil {
        printJsonError(w, r, 400, "Invalid timestamp")

    }

    speed, err := strconv.Atoi(r.Form.Get("speed"));
    if err != nil {
        printJsonError(w, r, 400, "Invalid Speed")

    }

    heading, err := strconv.Atoi(r.Form.Get("heading"));
    if err != nil {
        printJsonError(w, r, 400, "Invalid Heading")

    }


    // Enter it into the backing store
    var newIncident = Incident{
        AuthToken: authToken,
        Latitude: lat,
        Longitude: long,
        Timestamp: timestamp,
        Speed: speed,
        Heading: heading,
        Verified: false,
    }
    fmt.Println(newIncident);
    //addAlarm(FSClient, newIncident);
    addOne(newIncident, FSCTX, FSClient)
    // Enter to Block chain

    w.Header().Set("Content-Type", "application/json")
    printJsonResponse(w, r, newIncident)

}

func listAccident(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

    w.Header().Set("Content-Type", "application/json")
    getAll(FSCTX, FSClient)
    //printJsonResponse(w, r, FSClient.Items())

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
    router.POST("/report", reportAccident)
    router.GET("/list", listAccident)

    fmt.Println("Starting webserver....")
    log.Fatal(http.ListenAndServe(":80", router))

    defer termFireStoreClient(FSCTX, FSClient);
}
