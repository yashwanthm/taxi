const Utils = require("./src/utils");
const TaxiService = require("./src/services/taxi.service");

const TaxiInstance = new TaxiService();
var taxis = [];

var taxis = TaxiInstance.generateTaxis();
var app = {};
var trips = [];

const Taxi = new TaxiService(taxis);

const SearchService = require("./src/services/search.service")(app);
const TripService = require("./src/services/trip.service")(app);

const Trip = new TripService();
const Search = new SearchService();

var taxiRequiredFields = ["id", "pos.lat", "pos.lng"];

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});

const taxiTest = {
  id: expect.any(Number),
  pos: expect.objectContaining({
    lat: expect.toBeWithinRange(-90, 90),
    lng: expect.toBeWithinRange(-180, 180)
  }),
  pink: expect.any(Boolean)
};
const tripTest = {
  id: expect.any(Number),
  taxi: expect.objectContaining(taxiTest),
  startedAt: expect.any(Date),
  distance: expect.any(Number),
  status: expect.any(String)
};
const errorTest = {
  message: expect.any(String)
};
test("spawning of taxis", () => {
  expect(taxis).toEqual(
    expect.arrayContaining([expect.objectContaining(taxiTest)])
  );
});

test("book taxis", () => {
  var opts = {
    userLocation: Utils.getRandomLatLng(),
    pink: Math.random >= 0.5
  };
  Search.findTaxi(opts)
    .then(closestTaxi => {
      console.log(closestTaxi);
      expect(closestTaxi).objectContaining(taxiTest);
      Taxi.block(closestTaxi)
        .then(blockedTaxi => {
          expect(closestTaxi).objectContaining(taxiTest);
          Trip.start(blockedTaxi)
            .then(trip => {
              trips.push(trip);
              expect(trip).toEqual(tripTest);
            })
            .catch(err => {
              expect(err).objectContaining({
                message: expect.any(String)
              });
            });
        })
        .catch(err => {
          expect(err).objectContaining({
            message: expect.any(String)
          });
        });
      //Taxi.block
      //Trip.create
    })
    .catch(err => {
      expect(err).objectContaining(errorTest);
    });
});

  // test("End trip", () => {
  //   let tripId = trips[0].id;
  //   Trip.endTrip(tripId)
  //     .then(trip => {
  //       expect(trip).objectContaining(tripTest);
  //     })
  //     .catch(err => {
  //       expect(err).objectContaining(errorTest);
  //     });
  // });


//no taxis

//end trip - for each taxi, end trip; - Method only

//find taxi - for taxi.length, book; - API call

//end trip - for trips.length, end trip; - API call
