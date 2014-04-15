define(function(require){

	var Player = {

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){
			this.sprite = Game.add.sprite(0, 640, 'character');
			//sprite.animations.add('walk');
		    //sprite.animations.play('walk', 50, true);

		    //  Enable if for physics. This creates a default rectangular body.
			Game.physics.arcade.enable(this.sprite);

			this.sprite.body.bounce.y = 0.2;
		    this.sprite.body.linearDamping = 1;
		    this.sprite.body.collideWorldBounds = true;

			this.initInputs();
		    
		    console.log('Player Create', this);
		},

		initInputs: function(){
			console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
		},

		setTarget: function(target){
		    Game.add.tween(this.sprite.body).to(target, 1000, Phaser.Easing.Linear.None, true);
		},

		checkInputs: function(){
			var target = {
				x: this.sprite.x,
				y: this.sprite.y
			}

			if (this.cursors.up.isDown) {
		    	//console.log('up');
		    	target.y -= 64;
		    	this.setTarget(target);

		    } else if (this.cursors.down.isDown) {
		    	//console.log('down');
		    	target.y += 64;
		    	this.setTarget(target);

		    } else if (this.cursors.left.isDown) {
		    	//console.log('left');
		    	target.x -= 64;
		    	this.setTarget(target);

		    } else if (this.cursors.right.isDown) {
		    	//console.log('right');
		    	target.x += 64;
		    	this.setTarget(target);
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