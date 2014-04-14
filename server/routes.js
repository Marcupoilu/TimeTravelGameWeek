module.exports = function(app){
	var route = this;

	app.post('/sign', function(req, res){
		console.log(req.body);

		var user = new app.UserModel(req.body);
		user.save(function(err){
			if(err){
				console.log('err');
				throw err;
			}
			else{
				console.log('save user success')
				//mongoose.connection.close();
			}
		});
		//var user = new base.UserModel();
	});

	app.get('/sign', function(req, res){
		console.log('req.query = ', req.query);

		app.UserModel.findOne({
			email : req.query.email
		}, function(err, user){
			console.log(user);
			if(user && user.password == req.query.password){
				res.send(user);
			}
			else{
				// put error
				//res.send('no user found')
			}
		});
	});

	return route
}