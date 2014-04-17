define(function(require) {
	var Case = require("./Case"),
		DoorManager = require("./DoorManager"),
	    BlocsManager = require("./blocsManager"),
	    TPManager = require("./TeleporteurManager"),
	    SwitchManager = require("./SwitchManager"),
	    ConsoleManager = require("./ConsoleManager"),
	    ExitManager = require("./ExitManager");

	var color = {
		0: 'vert',
		1: 'orange',
		2: 'violet',
		3: 'bleu'
	}

	var Projection = function(depart, idColor){
		this.trajet = [_(depart).clone()];
		this.currId = -1;
		this.finish = false;
		this.full = false;
		this.active = false;
		this.currCase = _(this.trajet[0]).clone();
		this.idColor = idColor;

		this.preload = function()
		{
			//Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		};

		this.create = function(){
			// this.depart = depart || new Case(1,1);
			this.sprite = Game.add.sprite(this.currCase.x * 64, this.currCase.y * 64 - 64, 'perso_' + color[this.idColor]);
			this.sprite.animations.add('up', [0, 1]);
			this.sprite.animations.add('down', [2, 3]);
			this.sprite.animations.add('right', [4, 5, 6, 7]);
			this.sprite.animations.add('left', [8, 9, 10, 11]);
        	Game.sprites.push(this.sprite);
			Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
			this.sprite.alpha = 0;

			this.sprite.body.setSize(64,64,0,64);
		};

		this.addCase = function(proCase)
		{
			this.trajet.push(_(proCase).clone());
		};

		this.moveToNext = function()
		{
			// console.log("currId = " + this.currId + ", this.trajet = ", this.trajet);
			if(this.currId == -1){
				this.active = true;
				this.sprite.alpha = 1;
			}
			if(!this.finish){
				this.currId++;
				var pro = this.trajet[this.currId];
				var target = {
					x: this.sprite.body.x,
					y: this.sprite.body.y
				}
				this.moveToCase(pro.x, pro.y, target);
			}
			// console.log("moveToNext this.currID = " + this.currId + ", this.trajet = ", this.trajet.length - 1);
			this.finish = (this.currId >= this.trajet.length - 1);
			// console.log(this.finish);
			return !this.finish;
		};

		this.resetVelocity = function(){
			this.sprite.body.velocity.x = 0;
		    this.sprite.body.velocity.y = 0;
		};

		this.reset = function(){
			this.currId = -1;
			this.sprite.alpha = 0;
			this.active = false;
			this.currCase = _(this.trajet[0]).clone();
			
			this.sprite.body.x = this.currCase.x * 64;
			this.sprite.body.y = this.currCase.y * 64;
		};

		this.clear = function(){
			this.reset();
			this.trajet.splice(0, this.trajet.length);
			this.trajet = [this.currCase];
		};

		this.moveToCase = function(idX, idY, target){
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
				
				//this.setTarget(target, function(){
				var tp = _.findWhere(TPManager.teleporteurs, {x: future.x, y: future.y});
				if(tp){
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
				//});
				//return;
			}

			if(future.type.split("_")[0] == "door"){//console.log(future.x*64); console.log(future.y*64);
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

			//s'il n'y a pas d'objets sur la case on check le layer1
			if(future.type == "")
			{
				future = Game.mapCases.layer1[idY][idX];
				if(future.type == "ground")
					move = true;
			}
			else
				move = true;

			//gestion des blocs
			if(futureBloc.type == "bloc"){//console.log(future.x*64); console.log(future.y*64);
				var blocToCheck = _.findWhere(BlocsManager.blocsTable, {x:future.x*64, y:future.y*64});
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

			if (future.type == "console"){
				var consoleToCheck = _.findWhere(ConsoleManager.consoleObjects, {x:future.x*64, y:future.y*64});
				this.setTarget(target, function(){
					if (!consoleToCheck.activated){
						ConsoleManager.consolesON++;

						consoleToCheck.Activate();
						if (ConsoleManager.consolesON == ConsoleManager.maxConsolesON){
							ExitManager.exitObjects[0].Activate();
						}
					}
				});
				return;
			}


			if(move)
			{
				this.currCase.x = idX;
				this.currCase.y = idY;
			}

			this.setTarget(target);
		};
		
		this.setTarget = function(target, onComplete){
			// console.log("setTarget target = ", target, ", onComplete = ", onComplete);
			var _this = this;
			var velocity = this.sprite.body.velocity;

			if(velocity.y < 0){
				this.sprite.animations.play('up', 7, true);
			} else if(velocity.y > 0){
				this.sprite.animations.play('down', 7, true);
			} else if(velocity.x < 0){
				this.sprite.animations.play('left', 14, true);
			} else if(velocity.x > 0){
				this.sprite.animations.play('right', 14, true);
			}

			this.canMove = false;
		    this.tween = Game.add.tween(this.sprite.body).to(target, 300, Phaser.Easing.Linear.None, true);
		    this.tween.onComplete.add(function(){
		    	this.resetVelocity();
		    	//lookUtils.checkLook(this.currCase);
		    	this.sprite.animations.stop();
		    	if(onComplete) onComplete.apply();
		    }, this);
		};		
	};

    return Projection;
});