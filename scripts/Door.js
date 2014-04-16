define(function(require) {
	var Door = function(id,x,y){
		this.id = id;
		this.x = x;
		this.y = y;
		this.opened = false;
		this.sprite = Game.add.sprite(this.x, this.y, 'door');
		Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.bounce.y = 0;
		this.sprite.body.bounce.x = 0;
	    this.sprite.body.velocity = 0;
        Game.sprites.push(this.sprite);

		this.Open = function(){
			this.opened = true;
			this.sprite.visible = false;
		};
	};
	return Door;
});