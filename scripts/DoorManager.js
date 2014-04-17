define(function(require) {
	var Door = require("./Door");
	//var Player = require("./Player");

	var DoorManager = {
		preload: function(){
			Game.load.image('door_profil', '../images/GA/walls/door_profil.png');
			Game.load.image('door_face', '../images/GA/walls/door_front.png');
		},

		create : function(map){
			var _this = this;
			this.doorsTile = [];
			this.doorsObject = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				/*_.each(_.where(objectLayer, {type: 'door'}), function(door){
					_this.doorsTile.push(door);
				});*/
				_.each(objectLayer, function(obj){
					if(obj.type.split("_")[0] == "door")
						_this.doorsTile.push(obj);
				});
				console.log("objectLayer.type = ", objectLayer);
				// if(objectLayer.type.split("_")[0] == "door")
				// 	_this.doorsTile.push(door);
			});
			var door;
			_.each(this.doorsTile, function(door){
				// console.log(Game.map.layers[1].data[door.y][door.x].index);
				door = new Door(Game.map.layers[2].data[door.y][door.x].index,door.x*64, door.y*64, door.type.split("_")[1]);
				_this.doorsObject.push(door);
			});

		},

		update: function(){
			// var _this = this;
			// _.each(this.doorsObject, function(door){
			// 	// Game.debug.body(door.sprite);
		 //    	// if(Game.physics.arcade.collide(Player.sprite, door.sprite))
		 //    	// 	console.log("de")
		 //    						// if(_this.checkOverlap(door.sprite, Player.sprite)){
			// 		// 	console.log("overlapDoor")
			// 		// }		
			// });
		},

		closeAll: function(){
			for(var i = 0; i < this.doorsObject.length; ++i)
			{
				this.doorsObject[i].Close();
			}
		}
	}

	return DoorManager;
});