define(function(require) {
	Player = require('./Player');

	var Pod = function(x, y, startCase){
		var _this = this;
		this.sprite = Game.add.sprite(x, y, 'pod');
		this.startCase = _(startCase).clone();
		this.sprite.inputEnabled = true;
		//console.log(this.sprite.input);
        Game.sprites.push(this.sprite);

		this.sprite.update = function(){
			//console.log(_this.sprite.input.pointerDown());
			if(!Player.isReady && _this.sprite.input.pointerDown()){
				console.log("clic sur pod = ", this);
				_this.startCase.x = Math.floor(this.x / 64);
				_this.startCase.y = Math.floor(this.y / 64);
				if (Player.created)
					Player.resetVelocity();

				Player.create(_this.startCase);
			}
		}
	}

	return Pod;
});