const Utils = require("../utils");
class Taxi {
  constructor(taxis) {
    this._taxis = taxis;
  }
  generateTaxis() {
    let taxis = [];
    for (var i = 0; i < 10; i++) {
      taxis.push({
        id: i,
        available: true,
        pink: Math.random() >= 0.5,
        pos: Utils.getRandomLatLng()
      });
    }
    return taxis;
  }
  updateTaxis(taxis) {
    this._taxis = taxis;
  }
  availableTaxis(opts) {
    if (opts.pink) {
      return this._taxis.filter(t => t.available !== false && t.pink === true);
    } else {
      return this._taxis.filter(t => t.available !== false);
    }
  }
  getTaxiById(taxiId) {
    let taxi;
    this._taxis.map(t => {
      if (t.id === taxiId) {
        taxi = t;
      }
    });
    return taxi;
  }
  block(taxi) {
    return new Promise((resolve, reject) => {
      let taxis = this._taxis;
      taxis.map((t, i) => {
        if (t.id === taxi.id) {
          taxis[i] = taxi;
        }
      });
      taxi.available = false;
      this._taxis = taxis;
      return resolve(taxi);
    });
  }
  unblock(taxiId) {
    return new Promise((resolve, reject) => {
      let thisTaxi = this.getTaxiById(taxiId);
      if (!thisTaxi) {
        return reject({ message: "Unable to find taxi to end the trip" });
      }
      if (thisTaxi.available === true) {
        return reject({ message: `This taxi ${taxiId} is not on a trip.` });
      }

      this._taxis.map((t, i) => {
        if (t.id === thisTaxi.id) {
          if (t.available === false) {
            t.available === true;
          }
          //this.updateTaxi(taxiId)
          this._taxis[i] = t;
        }
      });
      return resolve(true);
    });
  }
}
module.exports = Taxi;
