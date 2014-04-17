define(function(require) {
	var Teleporteur = require("./Teleporteur");
	var Case = require("./Case");
	
	var colors = [
		"blue",
		"green",
		"orange",
		"purple"
	];

	var TeleporteurManager = {
		preload: function(){
			for(var i = 0; i < colors.length; ++i)
			{
				Game.load.image('teleport_'+colors[i], './images/GA/Blocs/TP_'+colors[i]+'.png');
			}
			// Game.load.image('teleport_blue', './images/GA/Blocs/TP_blue.png');
			// Game.load.image('teleport_green', './images/GA/Blocs/TP_green.png');
			// Game.load.image('teleport_orange', './images/GA/Blocs/TP_orange.png');
			// Game.load.image('teleport_purple', './images/GA/Blocs/TP_purple.png');
		},

		create : function(map){
			var _this = this;
			this.tpTiles = [];
			this.teleporteurs = [];
			var objectsLayer = map.layer2;
			this.tpTemp = null;

			_.each(objectsLayer, function(obj){
				_.each(_.where(obj, {type: 'teleport'}), function(tp){
					
					_this.tpTiles.push(tp);
				});
			});

			_.each(this.tpTiles, function(tpT){
				var idLink = Game.map.layers[2].data[tpT.y][tpT.x].index;
				_this.teleporteurs.push(new Teleporteur(idLink, tpT.x, tpT.y));
			});

			this.linkTeleporteurs();

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
			var idColor = 0;

			/*_.each(this.teleporteurs, function(tp){
				var _tp = tp;
				tp.changeTexture(colors[idColor]);
				_.each(_.where(_this.teleporteurs, {idLink: _tp.idLink}), function(link){
					console.log("each where linkTeleporteurs _tp = ", _tp, ", link = ", link);
					if(link.x != _tp.x || link.y != _tp.y)
					{
						_tp.target = new Case(_(link).clone().x, _(link).clone().y);
						// link.changeTexture(colors[idColor]);
					}
				});
				idColor ++;
				if(idColor >= colors.length)
					idColor = 0;
			});*/
			var _tp, link,
				_nb = this.teleporteurs.length,
				_tps = _(this.teleporteurs).clone(),
				_tps2 = _(this.teleporteurs).clone();

			for(var i = 0; i < _nb; ++i)
			{
				_tp = _tps2[i];
				_tp.changeTexture(colors[idColor]);
				for(var j = 0; j < _nb; ++j)
				{
					link = _tps[j];
					if(link.linkId == _tp.linkId)
					{
						// console.log("_link = ", link.idLink, ", _tp = ", _tp.idLink);
						if(link.x != _tp.x || link.y != _tp.y)
						{
							_tp.target = new Case(link.x, link.y);
							link.changeTexture(colors[idColor]);
						}
					}
				}
				link = null;
				idColor++;
				if(idColor >= colors.length)
					idColor = 0;
			}

		}
	}

	return TeleporteurManager;
});