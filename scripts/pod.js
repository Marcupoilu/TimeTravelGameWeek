define(function(require) {
	var Pod = function(x, y){
		var _this = this;
		this.sprite = Game.add.sprite(x, y, 'pod');

		this.sprite.inputEnabled = true;
		//console.log(this.sprite.input);

		this.sprite.update = function(){
			//console.log(_this.sprite.input.pointerDown());
		}
	}

	return Pod;
});