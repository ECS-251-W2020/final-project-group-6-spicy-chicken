package main

import (
    "fmt"
    "time"
    "strconv"
    "github.com/patrickmn/go-cache"

)

func initDB() *cache.Cache {
    return cache.New(24*time.Hour, 0*time.Hour);
}

func addAlarm(db *cache.Cache, newIncident Incident){

    key := strconv.Itoa(newIncident.AccountId) + strconv.Itoa(int(time.Now().Unix()));
    db.Set(key, newIncident, 0);
    return;
/*
    fmt.Println("lksldjf")
    fmt.Println(db)

    n := len(db)
    fmt.Println(db)

    //db = db[0 : n+1]
    db = append(db, newIncident);
    //db[n-1] = newIncident
*/
}

//func getAll(db *cache.Cache) {
/*func getAll(db []Incident) []Incident{
    return db
}*/

func printAll(db *cache.Cache) {

    for i, s := range db.Items() {
        fmt.Println(i, s)
    }
}
