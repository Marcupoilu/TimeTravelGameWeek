define(function(require) {
	var Player = require("./Player");
	var MainMenu = require("./MainMenu");

	var GameOverMenu = {
		preload: function(){
			Game.load.image('bg', '../images/fond_gris.png');
			Game.load.image('loose', '../images/loose.png');	
			Game.load.image("button" , "../images/button.png");
			this.labelOver = "You've created a paradox...\n You have never existed !";
		    this.style = { font: "30px Arial", fill: "#fff", align: "center" };
			this.labelMainMenu = "Main Menu";
			this.labelResetLevel = 'Reset Level'
		},

		create: function(){
			this.bgSprite = Game.add.sprite(0,0, 'bg');
			this.sprite = Game.add.sprite(Game.world.centerX/2,0, 'loose');
  			this.buttonMainMenu = Game.add.button(50, 450, 'button', this.onClickMainMenu, this);
    		this.buttonResetLevel = Game.add.button(550, 450, 'button', this.onClickResetLevel, this);
		  	this.t = Game.add.text(Game.world.centerX/2 + 120, 240, this.labelOver, this.style);
		  	this.tMainMenu = Game.add.text(Game.world.centerX/2 - 60, 490, this.labelMainMenu, this.style);
		  	this.tResetLevel = Game.add.text(Game.world.centerX/2 + 420, 490, this.labelResetLevel, this.style);
		 	Game.sprites.push(this.sprite, this.buttonResetLevel, this.buttonMainMenu, this.t, this.tMainMenu, this.tResetLevel, this.bgSprite);

		},

		update: function(){
			var _this = this;
		},

		onClickMainMenu: function(){
			MainMenu.create();
		},

		onClickResetLevel: function(){
			Player.isReady = false;
			Game.loadLevel(Game.currentLevel);
		},

		onDestroy: function(){

		}
	};

	return GameOverMenu;
});