define(function(require){
	var Case = require("./Case");

	var Player = {

		canMove : true,

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(caseDepart){
			this.currCase = caseDepart || new Case(1,1);
			this.sprite = Game.add.sprite(this.currCase.x * 64, this.currCase.y * 64 - 64, 'character');
			//sprite.animations.add('walk');
		    //sprite.animations.play('walk', 50, true);

		    //  Enable if for physics. This creates a default rectangular body.
			Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

			this.sprite.body.bounce.y = 0;
			this.sprite.body.bounce.x = 0;
		    this.sprite.body.linearDamping = 1;
		    this.sprite.body.collideWorldBounds = true;
		    this.sprite.body.setSize(64,64,0,64);
			this.initInputs();
		    
		    console.log('Player Create', this);
		    this.isReady = true;
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
		    	if(Game.physics.arcade.collide(_this.sprite, [Game.layerTiles, Game.layerObject])){
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
			    	// target.y -= 64;
			    	// this.setTarget(target);
			    	// this.sprite.body.velocity.y = -1;
			    	this.moveToCase(this.currCase.x, this.currCase.y - 1, target);

			    } else if (this.cursors.down.isDown) {
			    	//console.log('down');
			    	// target.y += 64;
			    	// this.setTarget(target);
			    	// this.sprite.body.velocity.y = 1;
			    	this.moveToCase(this.currCase.x, this.currCase.y + 1, target);

			    } else if (this.cursors.left.isDown) {
			    	//console.log('left');
			    	// target.x -= 64;
			    	// this.setTarget(target);
			    	// this.sprite.body.velocity.x = -1;
			    	this.moveToCase(this.currCase.x - 1, this.currCase.y, target);

			    } else if (this.cursors.right.isDown) {
			    	//console.log('right');
			    	// target.x += 64;
			    	// this.setTarget(target);
			    	// this.sprite.body.velocity.x = 1;
			    	this.moveToCase(this.currCase.x + 1, this.currCase.y, target);

			    }
			}

		},

		update: function(){
			this.checkInputs();
			//console.log(Game.physics.arcade.overlap(this.sprite, this.sprite2))
		},

		render: function(){

		},

		moveToCase: function(idX, idY, target){
			
			var future = Game.mapCases.layer2[idY][idX];
			var move = false;

			//s'il n'y a pas d'objets sur la case on check le layer1
			if(future.type == "")
			{
				future = Game.mapCases.layer1[idY][idX];
				if(future.type == "ground")
					move = true;
			}
			else
				move = true;
			
			//pour que le check des collisions se fasse quand même
			this.sprite.body.velocity.x = idX - this.currCase.x;
			this.sprite.body.velocity.y = idY - this.currCase.y;

			target.x += 64 * this.sprite.body.velocity.x;
			target.y += 64 * this.sprite.body.velocity.y;
			this.setTarget(target);

			if(move)
			{
				this.currCase.x = idX;
				this.currCase.y = idY;
			}
		}
	}

	return Player;
});