define(function(require) {

	var Timeline = function(startX, y, maxActions){
		this.max = maxActions || -1;
		this.nbActionsDone = 0;
		this.x = startX || 0;
		this.y = y || 0;
		this.futureX = this.x;

		this.sprites = [];
		this.spriteOff = 

		if(this.maxActions == -1) return;

		var myX = this.x;
		for(var i = 0; i < this.maxActions; ++i)
		{
			this.sprites.push(Game.add.sprite(myX, this.y, 'timelineOff'));
			myX += this.sprites[i].body.width + 2;
		}

		this.madeAnAction = function(){
			if(this.maxActions == -1)
			{
				this.sprites.push(this.futureX, this.y, 'timelineOn');
			}
			else
			{
				this.sprites[i].loadTexture("timelineOn");
			}
		}
	};

    return Timeline;
});