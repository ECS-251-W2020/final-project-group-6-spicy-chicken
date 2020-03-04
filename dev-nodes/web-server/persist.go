package main

import (
  "fmt"
  "log"

  "golang.org/x/net/context"
  //firebase "firebase.google.com/go"
  //  "firebase.google.com/go/auth"
  "google.golang.org/api/option"
  "cloud.google.com/go/firestore"
  "google.golang.org/api/iterator"

  "google.golang.org/genproto/googleapis/type/latlng"
)

func initFireStoreClient() (*firestore.Client, context.Context, error) {
    projectID := "spicychicken-268718"
    opt := option.WithCredentialsFile("spicychicken-268718-firebase-adminsdk-h1qb3-bd9c136e52.json")

    //app, err := firebase.NewApp(context.Background(), nil, opt)

    // Get a Firestore client.
    ctx := context.Background()
    client, err := firestore.NewClient(ctx, projectID, opt)
    if err != nil {
            log.Fatalf("Failed to create client: %v", err)
    }

    // Close client when done.
    //defer client.Close()
    return client, ctx, err
}

func getAll(ctx context.Context, client *firestore.Client) ( []Incident, error) {
    fmt.Println("All cities:")

    var incidents []Incident


    iter := client.Collection("accidents").Documents(ctx)
    for {
        doc, err := iter.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            return nil, err
        }

        var newFSinc FSIncident
        var newInc Incident
        doc.DataTo(&newFSinc)

        newInc.Latitude = newFSinc.Location.Latitude
        newInc.Longitude = newFSinc.Location.Longitude
        newInc.Speed = newFSinc.Speed
        newInc.Heading = newFSinc.Heading
        newInc.Timestamp = newFSinc.Timestamp
        newInc.Verified = true

        incidents = append(incidents, newInc)
    }

   return incidents, err
}

func addOne(one Incident, ctx context.Context, client *firestore.Client) error {

    accLoc := latlng.LatLng {
       Latitude: one.Latitude,
       Longitude: one.Longitude,
    }

    _, _, err = client.Collection("accidents").Add(ctx, map[string]interface{}{
            "speed": one.Speed,
            "heading":  one.Heading,
            "timestamp":  one.Timestamp,
            "Location": &accLoc,
    })

    if err != nil {
        // Handle any errors in an appropriate way, such as returning them.
        log.Printf("An error has occurred: %s", err)
    }

    return nil
}


func termFireStoreClient(ctx context.Context, client *firestore.Client) {

    client.Close()
}
