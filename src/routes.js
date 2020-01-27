'use strict';
var searchApi = require('./api/search');
const accountApi = require('./api/account');
exports = module.exports = function(app) {

  //API Routes
  app.use('/api/v1/search',searchApi)(app);
  app.use('/api/v1/account', accountApi)(app);

};
