define(function(require) {
	Player = require('./Player');

	var Pod = function(x, y, startCase,id){
		var _this = this;
		this.sprite = Game.add.sprite(x, y, 'pod');
		this.id = id;
		var imageNB = 1 + this.id;
		var imageName = "aura"+ imageNB + "";
		console.log(imageName);
		this.sprite2 = Game.add.sprite(x, y, imageName);
		this.sprite2.anchor.setTo(0.25, 0.25);
		this.startCase = _(startCase).clone();
		this.sprite.inputEnabled = true;
		//console.log(this.sprite.input);
        Game.sprites.push(this.sprite);
        Game.sprites.push(this.sprite2);
		this.sprite.update = function(){
			//console.log(_this.sprite.input.pointerDown());
		    this.style = { font: "30px Terminal", fill: "#fff", 'text-align': 'center', width: '100px'};
		  	this.tChoosePod = Game.add.text(Game.world.centerX/2 + 150, 320, 'Choose a time travel pod !', this.style);
			if(!Player.isReady && _this.sprite.input.pointerDown()){
				if (Player.created)
					Player.resetVelocity();
				console.log('player id', _this.id);
				Player.create(_this.startCase, -1, _this.id);
			}
		}
	}

	return Pod;
});