module.exports = function(app, express){
	var config = this;

	var express = require('express');

	app.configure(function(){
		app.use(express.static('../'));
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(app.router);
	});

	return config;
}