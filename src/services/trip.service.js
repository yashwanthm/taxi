exports = module.exports = function(app) {
  let Taxis = app.taxi;
  class Trip {
    constructor(opts) {
      this._trips = [];
      if (opts && opts.trips) {
        this._trips = opts.trips;
      }
    }
    createTrip(taxi) {
      let thisTrip = {};
      thisTrip.id = this._trips.length + 1;
      thisTrip.taxi = taxi;
      thisTrip.startedAt = new Date();
      thisTrip.distance = 0;
      thisTrip.status = "initialized";
      return thisTrip;
    }
    start(taxi) {
      return new Promise((resolve, reject) => {
        try {
          let thisTrip = this.createTrip(taxi);
          if (thisTrip.status === "initialized") {
            //other validations required to start a trip - isPaymentMethodValid() isLoggedIn() etc
            thisTrip.status = "ongoing";
          }
          this._trips.push(thisTrip);
          return resolve(thisTrip);
        } catch (error) {
          return reject(error);
        }
      });
    }
    getTrip(tripId) {
      let trip;
      this._trips.map(t => {
        if (t.id === tripId) {
          trip = t;
        }
      });
      return trip;
    }
    findCost(tripId) {}
    endTrip(tripId) {
      return new Promise((resolve, reject) => {
        let trip = this.getTrip(tripId);
        if (trip.status != "ongoing") {
          return reject({ message: "The trip no longer seems to be ongoing" });
        }
        let thisTaxi = trip.taxi;
        Taxis.unblock(thisTaxi.id)
          .then(status => {
            trip.status = "completed";
            // this.save()
            this._trips.map((t, i) => {
              if (t.id === trip.id) {
                this._trips[i] = trip;
              }
            });
            return resolve(trip);
          })
          .catch(err => {
            return reject(err);
          });
      });
    }
  }
  return Trip;
};
