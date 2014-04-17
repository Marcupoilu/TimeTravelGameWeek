define(function(require) {
	var Teleporteur = require("./Teleporteur");
	var Case = require("./Case");

	var TeleporteurManager = {
		preload: function(){
			Game.load.image('teleport', './images/TP_green.png');
		},

		create : function(map){
			var _this = this;
			this.tpTiles = [];
			this.teleporteurs = [];
			var objectsLayer = map.layer2;
			//var objectsLink = 
			this.tpTemp = null;

			_.each(objectsLayer, function(obj){
				_.each(_.where(obj, {type: 'teleport'}), function(tp){
					
					_this.tpTiles.push(tp);
				});
			});

			_.each(this.tpTiles, function(tp){
				var idLink = Game.map.layers[2].data[tp.y][tp.x].index;
				_this.teleporteurs.push(new Teleporteur(idLink, tp.x, tp.y));
			});

			this.linkTeleporteurs();

			// console.log("this.teleporteurs = ", this.teleporteurs);
		},

		update: function(){
			// var _this = this;
			// _.each(this.teleporteurs, function(tp){
			// 	//Game.debug.body(door.sprite);
		 //    	// if(Game.physics.arcade.collide(Player.sprite, door.sprite))
		 //    	// 	console.log("de")
		 //    						// if(_this.checkOverlap(door.sprite, Player.sprite)){
			// 		// 	console.log("overlapDoor")
			// 		// }		
			// });
		},

		linkTeleporteurs: function(){
			var _this = this;
			_.each(this.teleporteurs, function(tp){
				var _tp = tp;
				_.each(_.where(_this.teleporteurs, {idLink: _tp.idLink}), function(link){
					if(link.x != _tp.x || link.y != _tp.y)
						_tp.target = new Case(link.x, link.y);
				});
			});
		}
	}

	return TeleporteurManager;
});