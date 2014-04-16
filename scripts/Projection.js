define(function(require) {
	var Case = require("./Case"),
		DoorManager = require("./DoorManager"),
	    BlocsManager = require("./blocsManager"),
	    TPManager = require("./TeleporteurManager"),
	    SwitchManager = require("./SwitchManager"),
	    ConsoleManager = require("./ConsoleManager"),
	    ExitManager = require("./ExitManager");

	var Projection = function(depart){
		this.trajet = [depart];
		this.currId = -1;
		this.finish = false;
		this.full = false;
		this.active = false;
		this.currCase = depart;

		this.preload = function()
		{
			//Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		};

		this.create = function(depart){
			this.depart = depart || new Case(1,1);
			this.sprite = Game.add.sprite(this.depart.x * 64, this.depart.y * 64 - 64, 'projection');
        	Game.sprites.push(this.sprite);
			Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
			this.sprite.visible = false;

			this.sprite.body.setSize(64,64,0,64);
		};

		this.addCase = function(proCase)
		{
			this.trajet.push(proCase);
		};

		this.moveToNext = function()
		{
			// console.log("currId = " + this.currId + ", this.trajet = ", this.trajet);
			if(this.currId == -1) this.active = this.sprite.visible = true;
			if(!this.finish){
				this.currId++;
				var pro = this.trajet[this.currId];
				var target = {
					x: this.sprite.body.x,
					y: this.sprite.body.y
				}
				this.moveToCase(pro.x, pro.y, target);
			}

			this.finish = (this.currId >= this.trajet.length - 1);
		};

		this.moveToCase = function(idX, idY, target){
			var _this = this;			
			var future = Game.mapCases.layer2[idY][idX];
			var move = false;
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
			
			//gestion des blocs
			if(future.type == "bloc"){//console.log(future.x*64); console.log(future.y*64);
				var blocToCheck = _.findWhere(BlocsManager.blocsTable, {x:future.x*64, y:future.y*64});
				if(blocToCheck.canMove)
				{
					if(blocToCheck.moveDirection({
						x : this.sprite.body.velocity.x,
						y : this.sprite.body.velocity.y
					})){
						return true;
					}
					else
						return false;
				}
				else
					return
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
			
			//pour que le check des collisions se fasse quand même
			this.sprite.body.velocity.x = idX - this.currCase.x;
			this.sprite.body.velocity.y = idY - this.currCase.y;

			target.x += 64 * this.sprite.body.velocity.x;
			target.y += 64 * this.sprite.body.velocity.y;

			//si c'est un teleport on passe une fonction onComplete au setTarget pour qu'il se tp après être passé sur le téléporteur
			if(future.type == "teleport")
			{
				
				this.setTarget(target, function(){
					var tp = _.findWhere(TPManager.teleporteurs, {x: future.x, y: future.y});
					target.x = tp.target.x * 64;
					target.y = tp.target.y * 64;
					idX = tp.target.x;
					idY = tp.target.y;
					_this.currCase.x = idX;
					_this.currCase.y = idY;
					_this.setTarget(target);
				});
				return;
			}

			//si c'est un vortex on se destroy
			if(future.type == "vortex"){//console.log(future.x*64); console.log(future.y*64);
				//this.sprite.destroy();
				this.setTarget(target, function(){
					_this.sprite.destroy();
				});
				return;
			}

			if(move)
			{
				this.currCase.x = idX;
				this.currCase.y = idY;
			}

			if (future.type == "direction_right"){
				this.canMove = false;
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX+1, idY, target);
				});
				return;
			}
			else if (future.type == "direction_bottom"){
				this.canMove = false;
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX, idY+1, target);
				});
				return;
			}
			else if (future.type == "direction_left"){
				this.canMove = false;
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX-1, idY, target);
				});
				return;
			}
			else if (future.type == "direction_up"){
				this.canMove = false;
				this.setTarget(target, function(){
					_this.canMove = false;
					_this.moveToCase(idX, idY-1, target);
				});
				return;
			}
				this.canMove = true;

			this.setTarget(target);
			


		};
		
		this.setTarget = function(target, onComplete){
			// console.log("setTarget target = ", target, ", onComplete = ", onComplete);
			var _this = this;
			var lastPos = {
				x: this.sprite.body.x,
				y: this.sprite.body.y
			}
			this.canMove = false;
		    this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
		    this.tween.onUpdateCallback(function(){
		    	if(Game.physics.arcade.collide(_this.sprite, Game.layerTiles)){
		    		console.log('colide');
		    		_this.tween.stop();
		    		_this.canMove = true;
				}
		    });
		    this.tween.onComplete.add(function(){
		    	this.canMove = true;
		    	//lookUtils.checkLook(this.currCase);
		    	if(onComplete) onComplete.apply();
		    }, this);
		};		
	};

    return Projection;
});