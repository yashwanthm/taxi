const Taxi = require("./src/services/taxi.service");
const TaxiService = new Taxi();
var taxis = TaxiService.generateTaxis();
var app = {};
var trips = [];

var taxiRequiredFields = ['id', 'pos.lat','pos.lng'];
//no taxis
test("book taxi", () => {
  expect(taxis).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.toBeDefined
      })
    ])
  );
});

//find taxi - book all taxis; - Method only

//end trip - end all the active trips; - Method only

//find taxi - book all taxis; - API call

//end trip - end all the active trips; - API call



