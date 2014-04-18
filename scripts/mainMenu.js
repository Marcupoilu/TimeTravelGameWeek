define(function(require) {
	var Player = require("./Player");

	var mainMenu = {
		preload: function(){
			Game.load.image('mainMenu', '../images/MainMenu.png');	
			Game.load.image('button' , '../images/button.png');

		    this.style = { font: "30px Arial", fill: "#fff", 'text-align': 'center', width: '100px'};

			this.destroyArray = [];
		},

		create: function(){
			this.backgroundImg = Game.add.sprite(0, 0, 'mainMenu');
  			this.buttonPlay = Game.add.button(Game.world.centerX/2 + 95, 270, 'button', this.onClickPlay, this);
    		this.buttonCredit = Game.add.button(Game.world.centerX/2 + 95, 485, 'button', this.onClickCredit, this);
		  	this.tbuttonPlay = Game.add.text(Game.world.centerX/2 + 250, 320, 'Play', this.style);
		  	this.tbuttonCredit = Game.add.text(Game.world.centerX/2 + 240, 535, 'Credits', this.style);

		  	this.buttonPlay.scale.setTo(0.85, 1.1);
		  	this.buttonCredit.scale.setTo(0.85, 1.1);

		 	Game.menuSprites.push(this.backgroundImg, this.buttonPlay, this.buttonCredit, this.tbuttonPlay, this.tbuttonCredit);
		},

		update: function(){

		},

		onClickPlay: function(){
			Game.loadLevel(3);

		},

		onClickcredit: function(){
			console.log('Welcome in the Tardis');
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