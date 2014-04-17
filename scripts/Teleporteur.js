define(function(require) {
	var Teleporteur = function(linkId, x, y)
	{
		this.linkId = linkId;
		this.x = x;
		this.y = y;
		this.target = null;
		this.sprite = Game.add.sprite(this.x*64, this.y*64, 'teleport');

		this.setTarget = function(target){
			this.target = target;
		};

		this.searchTarget = function(){
			var layer = Game.map.layers[2];
			_.each(this.tpTiles, function(tp){
				var idLink = layer.data[tp.y][tp.x].index;
				_this.teleporteurs.push(new Teleporteur(idLink, tp.x, tp.y));
			});
		};
	}

	return Teleporteur;
});