define(function(require) {
	var Pod = function(x, y){
		this.sprite = Game.add.sprite(x, y, 'pod');
	}

	return Pod;
});