# Cab booking service with NodeJS
This repo has the model implementation of cab booking service.

## Directory Structure
src has the source for the project
Env is meant for stroing env variables
./index.js exposes app inside src

### src structure
/api - definition of routes
/config - Configuring controls for the app, reading various keys from env
/services - to enable CRUD and other methods for entities
/logger - for logging various activities
/data - Store of data. This project uses a dynamically generated data.json as the source.
/utils - General helper functions that may be required all around the application

### Interaction of entities
`app.js` - Initializes services with respective config, and attaches them to the 		``app`` context, initializes the routes from `api`
`taxi.service` - responsible for mutation and operations on taxi related data
`trip.service` - 	responsible for mutation and operations on trip releated data. A trip is initiated when the user successfully books a taxi
`serach.service` - uses `taxi.service` to find an available taxi
`api/trip/findTaxi` - uses `taxi.service` and `trip.service` to initate a trip. First searches for a closest available taxi, blocks the taxi and then initiates the trip for that taxi.
```
var findTaxiPayloadBlueprint = {
	"userLocation": {
		"lat": Number(Latitude),
		"lng": Number(Longitude)
	},
	"pink": Boolean
}
```
`api/trip/endTrip` - uses `trip.service` that inturn uses `taxi.service` unblocks the avalability and marks the trip as completed
```
var endTripPayloadBlueprint = {
	"id": 3 //id of the trip
}
```

For trying out the API, try this [postman collection](https://www.getpostman.com/collections/dc37bb5b8fcc74586bd7).