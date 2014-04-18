define(function(require) {
	var Exit = function(x,y){
		this.x = x;
		this.y = y;
		this.opened = false;
		this.sprite = Game.add.sprite(this.x, this.y, 'exit_close');
        Game.sprites.push(this.sprite);

		this.Activate = function(){
			this.opened = true;
			// this.sprite.visible = false;
			this.sprite.loadTexture("exit_open");
		};

		this.Deactivate = function(){
			this.opened = false;
			// this.sprite.visible = true;
			this.sprite.loadTexture("exit_close");
		};
	};
	return Exit;
});