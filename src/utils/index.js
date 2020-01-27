const vectorDistance = (dx, dy) => {
    return Math.sqrt(dx * dx + dy * dy);
};
const Utils = {
    getRandomLatLng() {
        let lngRange = [77.37, 77.39];
        let latRange = [12.59, 12,57];

        let lat = (Math.random() * (latRange[0] - latRange[1]) + latRange[0]).toFixed(4) * 1;
        let lng = (Math.random() * (lngRange[0] - lngRange[1]) + lngRange[0]).toFixed(4) * 1
        return {lat, lng};
    },
    
    
    locationDistance(location1, location2) {
        var dx = location1.lat - location2.lat,
          dy = location1.lng - location2.lng;
    
        return vectorDistance(dx, dy);
      }
}
module.exports = Utils;