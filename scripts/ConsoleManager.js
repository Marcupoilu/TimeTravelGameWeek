define(function(require) {
	var Console = require("./Console");
	//var Player = require("./Player");

	var ConsoleManager = {
		preload: function(){
			Game.load.image('console', '../images/consoleOFF.png');
		},

		create : function(map){
			var _this = this;
			this.consoleTiles = [];
			this.consoleObjects = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				_.each(_.where(objectLayer, {type: 'console'}), function(cons){
					_this.consoleTiles.push(cons);
				});
			});

			_.each(this.consoleTiles, function(cons){
				// console.log(Game.map.layers[1].data[door.y][door.x].index);
				_this.consoleObjects.push(new Console(cons.x*64, cons.y*64));
			});

		},

		update: function(){
			var _this = this;
			_.each(this.consoleObjects, function(cons){
				Game.debug.body(cons.sprite);
		    	// if(Game.physics.arcade.collide(Player.sprite, door.sprite))
		    	// 	console.log("de")
		    						// if(_this.checkOverlap(door.sprite, Player.sprite)){
					// 	console.log("overlapDoor")
					// }		
			});
		}
	}

	return ConsoleManager;
});