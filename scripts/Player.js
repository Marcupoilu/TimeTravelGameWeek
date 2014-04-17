define(function(require){
	var Case = require("./Case"),
		DoorManager = require("./DoorManager"),
	    BlocsManager = require("./blocsManager"),
	    TPManager = require("./TeleporteurManager"),
	    SwitchManager = require("./SwitchManager"),
	    lookUtils = require('./playersLookUtil'),
	    ProjectionManager = require("./ProjectionManager"),
	    ConsoleManager = require("./ConsoleManager"),
	    ExitManager = require("./ExitManager");

	var Player = {

		canMove : true,
		nbActions : 0,
		noMoreActions : false,

		preload: function(){
			Game.load.spritesheet('character', '../images/gabarit_chara.png', 64, 128, 1);
			this.created = false;
		},

		create: function(caseDepart, maxActions, id){
			this.currCase = _(caseDepart).clone() || new Case(1,1);
			this.maxActions = maxActions || -1;
			this.idColor = id;

			if(!this.created)
			{
				this.sprite = Game.add.sprite(this.currCase.x * 64, this.currCase.y * 64 - 64, 'character');
	        	// Game.sprites.push(this.sprite);
				this.created = true;
				//sprite.animations.add('walk');
			    //sprite.animations.play('walk', 50, true);

			    //  Enable if for physics. This creates a default rectangular body.
				Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

			    this.sprite.body.setSize(64,64,0,64);
				this.initInputs();
		    }
			else
			{
				this.sprite.body.x = this.currCase.x * 64;
				this.sprite.body.y = this.currCase.y * 64;
				this.sprite.alpha = 1;
				this.canMove = true;
			}

		    console.log('Player Create', this);
		    Game.gameState = 'play';
		    this.resetManagers();
		    this.isReady = true;
		},

		destroy: function(){
			this.created = false;
			this.sprite.destroy();
		},

		disappear: function(){
			this.resetVelocity();
			this.isReady = false;
			this.sprite.alpha = 0;
			this.canMove = false;
			this.nbActions = 0;
			this.noMoreActions = false;
			Game.playerDisappear();
		},

		resetManagers: function()
		{
			ConsoleManager.resetAll();
		    ExitManager.exitObjects[0].Deactivate();
		    ProjectionManager.addCaseToCurrentProjection(this.currCase);
		    ProjectionManager.moveAllProj();
		    // DoorManager.closeAll();
		    SwitchManager.deactivateAll();
		},

		initInputs: function(){
			//console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
			this.endButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		},

		resetVelocity: function(){
			this.sprite.body.velocity.x = 0;
		    this.sprite.body.velocity.y = 0;
		},

		setTarget: function(target, onComplete){
			// console.log("setTarget target = ", target, ", onComplete = ", onComplete);
			var _this = this;
			var _target = target;

			this.canMove = false;
		    this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
		    this.tween.onUpdateCallback(function(){
		    	if(Game.physics.arcade.collide(_this.sprite, Game.layerTiles)){
		    		_this.tween.stop();
		    		_this.resetVelocity();
		    		_this.canMove = true;
				}
		    });
		    this.tween.onComplete.add(function(){
		    	Game.manageAllLook();
		    	this.resetVelocity();
		    	this.canMove = true;
		    	this.sprite.body.x = _target.x;
				this.sprite.body.y = _target.y;
		    	if(onComplete) onComplete.apply();
		    }, this);
		},

		checkInputs: function(){
			var target = {
				x: this.sprite.body.x,
				y: this.sprite.body.y
			}

			if(this.canMove && !this.noMoreActions){
				if (this.cursors.up.isDown) {
			    	// target.y -= 64; // this.setTarget(target); // this.sprite.body.velocity.y = -1;
			    	this.moveToCase(this.currCase.x, this.currCase.y - 1, target);

			    } else if (this.cursors.down.isDown) {
			    	// target.y += 64; // this.setTarget(target); // this.sprite.body.velocity.y = 1;
			    	this.moveToCase(this.currCase.x, this.currCase.y + 1, target);

			    } else if (this.cursors.left.isDown) {
			    	// target.x -= 64; // this.setTarget(target); // this.sprite.body.velocity.x = -1;
			    	this.moveToCase(this.currCase.x - 1, this.currCase.y, target);

			    } else if (this.cursors.right.isDown) {
			    	// target.x += 64; // this.setTarget(target); // this.sprite.body.velocity.x = 1;
			    	this.moveToCase(this.currCase.x + 1, this.currCase.y, target);

			    }
			}

			if(this.endButton.isDown)
		    {
		    	this.canMove = false;
		    	ProjectionManager.closeCurrentProjection();
				this.disappear();
		    }
		},

		update: function(){
			this.checkInputs();
		},

		render: function(){

		},

		whenMoved: function(idX, idY){
			//var _this = scope || this;

			ProjectionManager.addCaseToCurrentProjection(new Case(idX, idY));
			ProjectionManager.moveAllProj();

			if(this.maxActions == -1) return;

			this.nbActions ++;
			this.noMoreActions = (this.nbActions >= this.maxActions);
			console.log("whenMoved = " + this.nbActions + ", this.maxActions = " + this.maxActions + ", this.noMoreActions = " + this.noMoreActions);
		},

		moveToCase: function(idX, idY, target){
			var _this = this;			
			var future = Game.mapCases.layer2[idY][idX];
			var futureBloc = Game.mapCases.layer3[idY][idX];
			var move = false;

			//pour que le check des collisions se fasse quand même
			this.sprite.body.velocity.x = idX - this.currCase.x;
			this.sprite.body.velocity.y = idY - this.currCase.y;

			target.x += 64 * this.sprite.body.velocity.x;
			target.y += 64 * this.sprite.body.velocity.y;

			//si c'est un teleport on passe une fonction onComplete au setTarget pour qu'il se tp après être passé sur le téléporteur
			if(future.type == "teleport")
			{
				// ProjectionManager.addCaseToCurrentProjection(new Case(idX, idY));
				// ProjectionManager.moveAllProj();
				
				var tp = _.findWhere(TPManager.teleporteurs, {x: future.x, y: future.y});
				if(tp){
					this.whenMoved(idX, idY);
					var noOtherWhenMoved = true;

					target.x = (tp.target.x + this.sprite.body.velocity.x) * 64;
					target.y = (tp.target.y + this.sprite.body.velocity.y) * 64;

					_this.sprite.body.x = tp.target.x * 64;
					_this.sprite.body.y = tp.target.y * 64;

					_this.currCase.x = tp.target.x;
					_this.currCase.y = tp.target.y;

					idX = tp.target.x + this.sprite.body.velocity.x;
					idY = tp.target.y + this.sprite.body.velocity.y;

					future = Game.mapCases.layer2[idY][idX];
					futureBloc = Game.mapCases.layer3[idY][idX];
				}

				//return;
			}

			if(future.type == "door"){//console.log(future.x*64); console.log(future.y*64);
				var doorToCheck = _.findWhere(DoorManager.doorsObject, {x:future.x*64, y:future.y*64});
				if(doorToCheck.opened)
					console.log(open)
				else
					return
			}

			if(future.type == "switch"){//console.log(future.x*64); console.log(future.y*64);
				var switchToCheck = _.findWhere(SwitchManager.switchObjects, {x:future.x*64, y:future.y*64});
				if(!switchToCheck.activated){
					switchToCheck.activated = true;
					switchToCheck.activate();
				}
			}
			


			if (future.type == "exit"){
				var exitToCheck = ExitManager.exitObjects[0];
				if(exitToCheck.opened)
					Game.Win();
				else
					return;
			}

			//s'il n'y a pas d'objets sur la case on check le layer1
			if(future.type == "")
			{
				future = Game.mapCases.layer1[idY][idX];
				if(future.type == "ground")
					move = true;
			}
			else
				move = true;
			

			if (future.type == "console"){
				var consoleToCheck = _.findWhere(ConsoleManager.consoleObjects, {x:future.x*64, y:future.y*64});
				// ProjectionManager.addCaseToCurrentProjection(new Case(idX, idY));
				// ProjectionManager.moveAllProj();
				this.whenMoved(idX, idY);
				this.setTarget(target, function(){
					if (!consoleToCheck.activated){
						ConsoleManager.consolesON++;

						consoleToCheck.Activate();

						ProjectionManager.closeCurrentProjection();
						if (ConsoleManager.consolesON == ConsoleManager.maxConsolesON){
							ExitManager.exitObjects[0].Activate();
						}
						_this.disappear();
					}
				});
				return;
			}

			//si c'est un vortex on se destroy
			if(future.type == "vortex"){//console.log(future.x*64); console.log(future.y*64);
				//this.sprite.destroy();
				this.setTarget(target, function(){
					//_this.sprite.destroy();
					_this.disappear();
				});
				return;
			}

			if(move){
				Game.playerMove();
			}

			//gestion des blocs
			if(futureBloc.type == "bloc"){//console.log(future.x*64); console.log(future.y*64);
				var blocToCheck = _.findWhere(BlocsManager.blocsTable, {x:futureBloc.x*64, y:futureBloc.y*64});
				if(blocToCheck && blocToCheck.canMove)
				{
					if(!blocToCheck.moveDirection({
						x : this.sprite.body.velocity.x,
						y : this.sprite.body.velocity.y
					})){
						return false;
					}	
				}
				else
					return;
			}

			if(move){
				this.currCase.x = idX;
				this.currCase.y = idY;
				if(!noOtherWhenMoved){
					this.whenMoved(idX, idY);
				}
				// ProjectionManager.addCaseToCurrentProjection(new Case(idX, idY));
				// ProjectionManager.moveAllProj();
			}

			if (future.type == "ice")
			{
				this.canMove = false;
				//beurk
				this.nbActions --;
				
				direction = _(this.sprite.body.velocity).clone();
		
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX+direction.x, idY+direction.y, target);
				});
				
				return;
			}
			if (future.type == "direction_right"){
				this.canMove = false;
				//beurk
				this.nbActions --;

				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX+1, idY, target);
				});
				return;
			}
			else if (future.type == "direction_bottom"){
				this.canMove = false;
				//beurk
				this.nbActions --;

				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX, idY+1, target);
				});
				return;
			}
			else if (future.type == "direction_left"){
				this.canMove = false;
				//beurk
				this.nbActions --;
				
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX-1, idY, target);
				});
				return;
			}
			else if (future.type == "direction_up"){
				this.canMove = false;
				//beurk
				this.nbActions --;
				
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX, idY-1, target);
				});
				return;
			}
			this.canMove = true;
			this.setTarget(target);
			
		}
	}

	return Player;
});