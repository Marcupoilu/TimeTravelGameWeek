define(function(require) {
	
	var Projection = function(trajet){
		this.trajet = trajet || [];
		this.currId = 0;

		this.preload = function()
		{
			Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		};

		this.create = function(depart){
			this.sprite = Game.add.sprite(depart.x * 64, depart.y * 64 - 64, 'projection');
			Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

			this.sprite.body.setSize(64,64,0,64);
		}

		this.addCase = function(proCase)
		{
			this.trajet.push(proCase);
		};

		this.moveToNext = function()
		{
			// console.log("currId = " + this.currId + ", this.trajet = ", this.trajet);
			if(this.currId != this.trajet.length - 1){
				this.currId++;
				this.moveToCase(this.trajet[this.currId]);
			}
		}

		this.moveToCase = function(proCase)
		{
			// console.log("je bouge à la case ", proCase);
		}
	}

    return Projection;
});