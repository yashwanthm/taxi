const express = require("express");

exports = module.exports = function(app) {
  var router = express.Router();

  const Trip = app.trip;
  var Taxi = app.taxi;
  const Search = app.search;

  router.post("/findtaxi", (req, res, next) => {
    const payload = req.body;
    console.log(payload);
    if (
      !payload.userLocation ||
      !payload.userLocation.lat ||
      !payload.userLocation.lng
    ) {
      return res.status(400).json({
        message: "Please make sure you enter the location correctly"
      });
    }
    var opts = {
      userLocation: payload.userLocation,
      pink: payload.pink || false
    };
    Search.findTaxi(opts)
      .then(closestTaxi => {
        console.log(closestTaxi);
        if (!closestTaxi) {
          return res
            .status(400)
            .json({ message: "Unable to find an available taxi for you" });
        }
        Taxi.block(closestTaxi)
          .then(blockedTaxi => {
            console.log(blockedTaxi);
            Trip.start(blockedTaxi).then(trip=>{
                return res.status(200).json(trip);
            }).catch(err=>{
                return res.status(400).json(err);
            });
          })
          .catch(err => {
            res.status(500).json({ message: "Unable to book selected taxi" });
          });
        //Taxi.block
        //Trip.create
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  });
  router.post("/endTrip", (req, res, next)=>{
    let payload = req.body;
    console.log('payload is ', payload)
    if(!payload.id){
        return res.status(400).json({message: 'You need to specify the id of the trip that you want to end'});
    }
    const tripId = payload.id;
    Trip.endTrip(tripId).then(trip=>{
        console.log(trip);
        return res.status(200).json(trip);
    }).catch(err=>{
        console.log(err);
        return res.status(400).json(err)
    })
  })
  return router;
};
