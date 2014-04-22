define(function(require) {
	var Exit = require("./Exit");
	var ConsoleManager = require("./ConsoleManager");

	var ExitManager = {
		preload: function(){
			Game.load.image('exit_close', './images/exit_close.png');
			Game.load.image('exit_open', './images/exit_open.png');
		},

		create : function(map){
			var _this = this;
			this.exitTiles = [];
			this.exitObjects = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				_.each(_.where(objectLayer, {type: 'exit'}), function(exit){
					_this.exitTiles.push(exit);
				});
			});

			_.each(this.exitTiles, function(exit){
				_this.exitObjects.push(new Exit(exit.x*64, exit.y*64));
			});

		},

		update: function(){
			// var _this = this;
			// _.each(this.exitObjects, function(exit){
		 //    	if()	
			// });
		}
	}

	return ExitManager;
});