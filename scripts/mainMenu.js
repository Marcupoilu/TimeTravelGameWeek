define(function(require) {
	var Player = require("./Player");
	var Credits = require("./CreditsMenu");
	var ControlesMenu = require("./ControlesMenu");

	var mainMenu = {
		preload: function(){
			Game.load.image('mainMenu', './images/menu/MainMenu.png');	
			Game.load.image('button' , './images/button.png');
			Game.load.image('inv' , './images/menu/invisible_button.png');

			Credits.preload();
    		ControlesMenu.preload();

		    this.style = { font: "30px Terminal", fill: "#fff", 'text-align': 'center', width: '100px'};

			this.destroyArray = [];
		},

		create: function(){
			this.backgroundImg = Game.add.sprite(0, 0, 'mainMenu');
  			this.buttonPlay = Game.add.button(Game.world.centerX/2 + 95, 270, 'button', this.onClickPlay, this);
		  	this.tbuttonPlay = Game.add.text(Game.world.centerX/2 + 250, 320, 'Play', this.style);

    		this.buttonControles = Game.add.button(Game.world.centerX/2 + 95, 485, 'button', this.onClickControles, this);
		  	this.tbuttonControles = Game.add.text(Game.world.centerX/2 + 220, 535, 'Controles', this.style);

		  	this.buttonCredits = Game.add.button(Game.world.width - 235, Game.world.height - 88, "inv", this.onClickCredit, this);
		  	this.tbuttonCredits = Game.add.text(Game.world.width - 150, Game.world.height - 50, 'Credits', this.style);

		  	this.buttonPlay.scale.setTo(0.85, 1.1);
		  	this.buttonCredits.scale.setTo(0.6, .8);
		  	this.buttonControles.scale.setTo(0.85, 1.1);

		 	Game.menuSprites.push(this.backgroundImg, this.buttonPlay, this.buttonCredit, this.buttonControles, this.tbuttonPlay, this.tbuttonCredit, this.tbuttonControles);
		},

		update: function(){

		},

		onClickPlay: function(){
			Game.loadLevel(0);
		},

		onClickCredit: function(){
			Credits.create();
		},

		onClickControles: function(){
			this.visible = false;
			ControlesMenu.create();
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