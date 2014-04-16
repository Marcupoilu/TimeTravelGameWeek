define(function(require) {
	var ExitManager = {
		this.opened = false;

		preload: function(){
			Game.load.image('exit', '../images/exit.png');
		},

		create : function(map){
			this.sprite = Game.add.sprite(this.x, this.y, 'exit');
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
				maxConsolesOn++;
				_this.exitObjects.push(new Console(exit.x*64, exit.y*64));
			});

		},

		update: function(){
			var _this = this;
			_.each(this.exitObjects, function(cons){
		    	// if(Game.physics.arcade.collide(Player.sprite, door.sprite))
		    	// 	console.log("de")
		    						// if(_this.checkOverlap(door.sprite, Player.sprite)){
					// 	console.log("overlapDoor")
					// }		
			});
		}
	}

	return ExitManager;
});