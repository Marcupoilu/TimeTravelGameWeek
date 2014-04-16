define(function(require) {
	var Console = function(x,y){
		this.x = x;
		this.y = y;
		this.activated = false;
		this.sprite = Game.add.sprite(this.x, this.y, 'console');

		this.Activate = function(){
			this.activated = true;
			this.sprite.visible = false;
		};
	};
	return Console;
});