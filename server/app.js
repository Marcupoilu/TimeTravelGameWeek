var express = require('express');
var app = module.exports = express();

var config = require("./config.js")(app, express);

require('./routes.js')(app);

app.listen(3000);