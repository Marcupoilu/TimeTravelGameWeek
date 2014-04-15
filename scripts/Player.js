define(function(require){

	var Player = {

		speed: 400,

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){
			this.sprite = Game.add.sprite(0, 640, 'character');
			//sprite.animations.add('walk');
		    //sprite.animations.play('walk', 50, true);

		    //  Enable if for physics. This creates a default rectangular body.
			Game.physics.p2.enable(this.sprite);

		    //  Modify a few body properties
			this.sprite.body.setZeroDamping();
			this.sprite.body.fixedRotation = true;

			this.initInputs();
		    
		    console.log('Player Create', this);
		},

		initInputs: function(){
			console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
		},

		checkInputs: function(){
			if (this.cursors.up.isDown) {
		    	console.log('up');
		    	this.sprite.body.moveUp(this.speed);

		    } else if (this.cursors.down.isDown) {
		    	console.log('down');
		    	this.sprite.body.moveDown(this.speed);

		    } else if (this.cursors.left.isDown) {
		    	console.log('left');
		    	this.sprite.body.moveLeft(this.speed);

		    } else if (this.cursors.right.isDown) {
		    	console.log('right');
		    	this.sprite.body.moveRight(this.speed);
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