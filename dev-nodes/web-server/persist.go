package main

import (
    "fmt"
    //"strconv"
    //"github.com/patrickmn/go-cache"

)

//func initDB() *cache.Cache {
func initDB() []Incident {
    //return cache.New(24*time.Hour, 0*time.Hour);
    return make([]Incident, 1)
}

//func addAlarm(db *cache.Cache, newIncident Incident){
func addAlarm(db []Incident, newIncident Incident){

    //key := strconv.Itoa(newIncident.AccountId);
    //db.Set(key, newIncident, 0);
   //return;
    fmt.Println("lksldjf")
    fmt.Println(db)

    n := len(db)
    fmt.Println(db)

    //db = db[0 : n+1]
    db = append(db, newIncident);
    //db[n-1] = newIncident
}

//func getAll(db *cache.Cache) {
func getAll(db []Incident) []Incident{
    return db
}

func printAll(db []Incident) {

    for i, s := range db {
        fmt.Println(i, s)
    }
}
