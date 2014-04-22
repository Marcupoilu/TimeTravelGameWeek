define(function(require) {
	var Switch = require("./Switch");

	var SwitchManager = {
		preload: function(){
			Game.load.image('switch_on', './images/switch_on.png');
			Game.load.image('switch_off', './images/switch_off.png');
		},

		create: function(map){
			var _this = this;
			this.switchTiles = [];
			this.switchObjects = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				_.each(_.where(objectLayer, {type: 'switch'}), function(swit){
					_this.switchTiles.push(swit);
				});
			});

			_.each(this.switchTiles, function(swit){
				_this.switchObjects.push(new Switch(Game.map.layers[2].data[swit.y][swit.x].index,swit.x*64, swit.y*64));
			});

		},

		update: function(){
			var _this = this;
			_.each(this.switchObjects, function(swit){
				// Game.debug.body(swit.sprite);
		    	// if(Game.physics.arcade.collide(Player.sprite, door.sprite))
		    	// 	console.log("de")
		  //   	if(_this.checkOverlap(swit.sprite, Player.sprite)){
				// 	swit.activate();
				// }
			});
		},

		checkOverlap: function(spriteA, spriteB){
		 	var boundsA = spriteA.getBounds();
		    var boundsB = spriteB.getBounds();

		    return Phaser.Rectangle.intersects(boundsA, boundsB);
		},

		deactivateAll: function()
		{
			for(var i = 0; i < this.switchObjects.length; ++i)
			{
				this.switchObjects[i].deactivate();
			}
		}
	}

	return SwitchManager;
});