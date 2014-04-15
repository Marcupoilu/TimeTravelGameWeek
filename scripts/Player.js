define(function(require){

	var Player = {

		canMove : true,

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){
			this.sprite = Game.add.sprite(0, 640, 'character');
			//sprite.animations.add('walk');
		    //sprite.animations.play('walk', 50, true);

		    //  Enable if for physics. This creates a default rectangular body.
			Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

			this.sprite.body.bounce.y = 0;
			this.sprite.body.bounce.x = 0;
		    this.sprite.body.linearDamping = 1;
		    this.sprite.body.collideWorldBounds = true;

			this.initInputs();
		    
		    console.log('Player Create', this);
		},

		initInputs: function(){
			//console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
		},

		resetVelocity: function(){
			this.sprite.body.velocity.x = 0;
		    this.sprite.body.velocity.y = 0;
		},

		setTarget: function(target){
			var _this = this;
			var lastPos = {
				x: this.sprite.body.x,
				y: this.sprite.body.y
			}
			this.canMove = false;
		    this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
		    this.tween.onUpdateCallback(function(){
		    	if(Game.physics.arcade.collide(Player.sprite, Game.layerTiles)){
		    		//console.log('colide');
		    		_this.tween.stop();
		    		_this.resetVelocity();
		    		_this.canMove = true;
				}
		    });
		    this.tween.onComplete.add(function(){
		    	this.resetVelocity();
		    	this.canMove = true;
		    }, this);
		},

		checkInputs: function(){
			var target = {
				x: this.sprite.body.x,
				y: this.sprite.body.y
			}

			if(this.canMove){
				if (this.cursors.up.isDown) {
			    	//console.log('up');
			    	target.y -= 64;
			    	this.setTarget(target);
			    	this.sprite.body.velocity.y = -1;

			    } else if (this.cursors.down.isDown) {
			    	//console.log('down');
			    	target.y += 64;
			    	this.setTarget(target);
			    	this.sprite.body.velocity.y = 1;

			    } else if (this.cursors.left.isDown) {
			    	//console.log('left');
			    	target.x -= 64;
			    	this.setTarget(target);
			    	this.sprite.body.velocity.x = -1;

			    } else if (this.cursors.right.isDown) {
			    	//console.log('right');
			    	target.x += 64;
			    	this.setTarget(target);
			    	this.sprite.body.velocity.x = 1;
			    }
			}

		},

		update: function(){
			this.checkInputs();
			//console.log(Game.physics.arcade.overlap(this.sprite, this.sprite2))
		},

		render: function(){

		}
	}

	return Player;
});