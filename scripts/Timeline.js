define(function(require) {

	var Timeline = function(startX, y, maxActions){
		this.max = maxActions || -1;
		this.nbActionsDone = 0;
		this.startX = startX || 0;
		this.x = this.startX || 0;
		this.y = y || 0;
		this.futureX = _(this.x).clone();
		this.current = 0;

		this.sprites = [];

		if(this.max != -1)
		{
			var myX = this.x;
			for(var i = 0; i < this.max; ++i)
			{
				this.sprites.push(Game.add.sprite(myX, this.y, 'timelineOff'));
				myX += this.sprites[i].width;
			}
		}

		this.madeAnAction = function(){
			console.log("timeline madeAnAction ", this);
			if(this.max == -1)
			{
				this.sprites.push(Game.add.sprite(this.futureX, this.y, 'timelineOn'));
				this.futureX += this.sprites[this.current].width;
			}
			else
			{
				if(this.current == this.sprites.length) return;
				this.sprites[this.current].loadTexture("timelineOn");
			}
			this.current ++;
		};

		this.reset = function(){
			this.x = this.startX;
			this.futureX = _(this.x).clone();
			this.current = 0;

			if(this.max == -1)
			{
				for(var i = 0; i < this.sprites.length; ++i)
				{
					this.sprites[i].destroy();
				}
				this.sprites.splice(0, this.sprites.length);
			}
			else
			{				
				for(var i = 0; i < this.sprites.length; ++i)
				{
					this.sprites[i].loadTexture("timelineOff");
				}
			}
		};
	};

    return Timeline;
});