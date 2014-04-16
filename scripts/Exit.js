define(function(require) {
	var Exit = function(x,y){
		this.x = x;
		this.y = y;
		this.opened = false;
		this.sprite = Game.add.sprite(this.x, this.y, 'exit');

		this.Activate = function(){
			this.opened = true;
			this.sprite.visible = false;
		};
	};
	return Exit;
});