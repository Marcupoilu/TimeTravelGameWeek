define(function(require) {
	var Player = require("./Player");
	var MainMenu = require("./mainMenu");

	var WinMenu = {
		preload: function(){
			Game.load.image('win', './images/win.png');	
			Game.load.image("button" , "./images/button.png");
			Game.load.image('bgWin', './images/fond_gris.png');
			this.labelWin = "Congratulations ! \n Level Finished !";
		    this.style = { font: "30px Arial", fill: "#fff", align: "center" };
			this.labelMainMenu = "Main Menu";
			this.labelNextLevel = 'Next Level'
			this.t, this.tMainMenu, this.tNextLevel;
			this.destroyArray = [];
		},

		create: function(){
			this.bgSprite = Game.add.sprite(0,0, 'bgWin');
			this.sprite = Game.add.sprite(Game.world.centerX/2,0, 'win');
  			this.buttonMainMenu = Game.add.button(50, 450, 'button', this.onClickMainMenu, this);
    		this.buttonNextLevel = Game.add.button(550, 450, 'button', this.onClickNextLevel, this);
		  	this.t = Game.add.text(Game.world.centerX/2 + 170, 240, this.labelWin, this.style);
		  	this.tMainMenu = Game.add.text(Game.world.centerX/2 - 80, 490, this.labelMainMenu, this.style);
		  	this.tNextLevel = Game.add.text(Game.world.centerX/2 + 420, 490, this.labelNextLevel, this.style);

		 	Game.sprites.push(this.sprite, this.buttonNextLevel, this.buttonMainMenu, this.t, this.tMainMenu, this.tNextLevel, this.bgSprite);
		},

		update: function(){
			var _this = this;
		},

		onClickMainMenu: function(){
			MainMenu.create();
		},

		onClickNextLevel: function(){
			this.onDestroy();
			Game.currentLevel++;
			Game.loadLevel(Game.currentLevel);
		},

		onDestroy: function(){
			Player.isReady = false;
			_.each(this.destroyArray, function(toDestroy){
				toDestroy.destroy();
			});
		}
	};

	return WinMenu;
});