define(function(require) {
	var Player = require("./Player");

	var mainMenu = {
		preload: function(){
			Game.load.image('mainMenu', '../images/MainMenu.png');	
			Game.load.image('button' , '../images/button.png');

		    this.style = { font: "30px Arial", fill: "#fff", align: "center" };

			this.destroyArray = [];
		},

		create: function(){
			this.backgroundImg = Game.add.image('mainMenu');
  			this.buttonPlay = Game.add.button(Game.world.centerX/2, 500, 'button', this.onClickPlay, this);
    		this.buttonCredit = Game.add.button(Game.world.centerX/2, 700, 'button', this.onClickCredit, this);
		  	this.tbuttonPlay = Game.add.text(Game.world.centerX/2, 490, 'Play', this.style);
		  	this.tbuttonCredit = Game.add.text(Game.world.centerX/2, 490, 'Credit', this.style);

		 	Game.sprites.push(this.sprite, this.buttonNextLevel, this.buttonMainMenu, this.t, this.tMainMenu, this.tNextLevel)
		},

		update: function(){

		},

		onClickPlay: function(){
			Game.loadLevel(1);
		},

		onClickcredit: function(){
			console.log('welcome in the Tardis');
		},

		onDestroy: function(){
			Player.isReady = false;
			_.each(this.destroyArray, function(toDestroy){
				toDestroy.destroy();
			});
		}
	};

	return mainMenu;
});