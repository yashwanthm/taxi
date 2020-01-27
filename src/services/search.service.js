const Taxi = require("./taxi.service"); //replace with db;
const Trip = require("./trip.service");
const Util = require("../utils");

exports = module.exports = function(app) {
  var Taxi = app.taxi;
  console.log('search service ', Taxi);
  class Search {
    constructor() {}
    closestTaxi(userLocation, taxis) {
        if(taxis.length === 0){
            return null;
        }
      return taxis.reduce(function(prev, curr) {
        var prevDistance = Util.locationDistance(userLocation, prev),
          currDistance = Util.locationDistance(userLocation, curr);
        return prevDistance < currDistance ? prev : curr;
      });
    }
    findTaxi(options) {
      return new Promise((resolve, reject) => {
        let { userLocation } = options;
        let availableTaxis = Taxi.availableTaxis(options);
        // if (options.pink && options.pink === true) {
        //   availableTaxis = Taxi.filter(t => t.pink && t.available);
        // }

        //validate
        if (!userLocation || !userLocation.lat || !userLocation.lng) {
          return;
        }
        let closesTaxi = this.closestTaxi(userLocation, availableTaxis);
        if (closesTaxi) {
          return resolve(closesTaxi);
        } else {
          return reject({ message: "Unable to find an available taxi" });
        }
      });
    }
  }
  return Search;
};
