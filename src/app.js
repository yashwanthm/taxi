"use strict";
const express = require('express');

//Logging is one of the most crucial aspects for debugging, analytics, state reproduction in case of disaisters.
//Choosing Winston to allow for all of that as Winston allows to add various transprots.
const {log} = require('./logger');

const config = require('./config');
const {port} = config;  

var app = express();
//Initialize taxi service
const Taxi = require('./services/taxi.service');
const TaxiService = new Taxi();

//spawn taxis
var taxis = TaxiService.generateTaxis();

//attach taxi service to the app to facilitate various interactions with taxi
app.taxi = new Taxi(taxis);

//initialize and attach more services
const Trip = require('./services/trip.service')(app);
const Search = require('./services/search.service')(app);
app.trip = new Trip();
app.search = new Search();


//Load routes
var tripRouter = require('./api/trip')(app);

// attach logger to app
if (app.get('env') === 'development') {
	log.debug('Overriding \'Express\' logger');
	app.use(require('morgan')('dev'));
}
else {
	app.use(require('morgan')('common', { 'stream': log.stream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use('/', (req, res)=>{
// 	res.status(200).json({
// 		message:'Welcome to Fuber API'
// 	});
// });


app.use('/trip', tripRouter);
app.listen(port, () => log.info(`Holler from Fuber! Listening on ${port}!`));
module.exports = app;
