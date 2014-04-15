define(function(require){

	var Player = {

		speed: 5,

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){
			this.sprite = Game.add.sprite(0, 640, 'character');
			//sprite.animations.add('walk');
		    //sprite.animations.play('walk', 50, true);

			this.initInputs();
		    
		    console.log('Player Create', this);
		},

		initInputs: function(){
			console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
		},

		checkInputs: function(){
			if (this.cursors.up.isDown) {
		    	//console.log('up');
		    	this.sprite.y -= this.speed;

		    } else if (this.cursors.down.isDown) {
		    	//console.log('down');
		    	this.sprite.y += this.speed;

		    } else if (this.cursors.left.isDown) {
		    	//console.log('left');
		    	this.sprite.x -= this.speed;

		    } else if (this.cursors.right.isDown) {
		    	//console.log('right');
		    	this.sprite.x += this.speed;
		    }
		},

		update: function(){
			this.checkInputs();
		},

		render: function(){

		}
	}

	return Player;
});