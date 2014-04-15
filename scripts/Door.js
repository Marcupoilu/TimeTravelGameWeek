define(function(require) {
	var Door = function(id,x,y){
		this.x = x;
		this.y = y;
		this.opened = false;
		this.sprite = Game.add.sprite(this.x, this.y, 'door');
		Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.bounce.y = 0;
		this.sprite.body.bounce.x = 0;
	    this.sprite.body.velocity = 0;
	};

	this.Open = function(){
		
	};
	return Door;
});