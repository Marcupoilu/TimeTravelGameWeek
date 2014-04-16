define(function(require) {
	//var Player = require("./Player");

	var GameOverMenu = {
		preload: function(){
			Game.load.image('win', '../images/win.png');	
			Game.load.image("button" , "../images/button.png");
			this.labelOver = "You've created a paradox...\n You have never existed !";
		    this.style = { font: "30px Arial", fill: "#fff", align: "center" };
			this.labelMainMenu = "Main Menu";
			this.labelResetLevel = 'Reset Level'
		},

		create: function(){
			this.sprite = Game.add.sprite(Game.world.centerX/2,0, 'win');
  			this.buttonMainMenu = Game.add.button(50, 450, 'button', this.onClickMainMenu, this);
    		this.buttonResetLevel = Game.add.button(550, 450, 'button', this.onClickResetLevel, this);
		  	this.t = Game.add.text(Game.world.centerX/2 + 110, 280, this.labelOver, this.style);
		  	this.tMainMenu = Game.add.text(Game.world.centerX/2 - 80, 490, this.labelMainMenu, this.style);
		  	this.tResetLevel = Game.add.text(Game.world.centerX/2 + 420, 490, this.labelResetLevel, this.style);
		 	Game.sprites.push(this.sprite, this.buttonResetLevel, this.buttonMainMenu, this.t, this.tMainMenu, this.tResetLevel)

		},

		update: function(){
			var _this = this;
		},

		onClickMainMenu: function(){
			console.log("retour main menu");
		},

		onClickResetLevel: function(){
			console.log("Reset Level");
		},

		onDestroy: function(){

		}
	};

	return GameOverMenu;
});