define(function(require) {
	var Map = require("./Map");
	var Player = require('./Player');
	var DoorManager = require("./DoorManager");
	var podsManager = require('./podsManager');
	var SwitchManager = require("./SwitchManager");
	var blocsManager = require('./blocsManager');
	var TeleporteurManager = require('./TeleporteurManager');
	var ConsoleManager = require("./ConsoleManager");

	return new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
			this.game.load.tilemap('test', 'Assets/Levels/mapTest.json', null, Phaser.Tilemap.TILED_JSON);

    		//  Next we load the tileset. This.game is just an image, loaded in via the normal way we load images:

    		this.game.load.image('tiles', 'Assets/typeOfCase.png');
    		this.game.load.image('linksImg', 'Assets/links.png');
    		podsManager.preload();
    		DoorManager.preload();
    		SwitchManager.preload();
    		ConsoleManager.preload();
    		Player.preload();
		},

		create: function(){
			var _this = this;
			console.log('Game Create', this.game);
			//	Enable p2 physics
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.game.stage.backgroundColor = '#787878';

		    this.game.map = this.game.add.tilemap('test');
		    this.game.map.addTilesetImage('typeOfCase', 'tiles');
		    this.game.map.addTilesetImage('links', 'linksImg');
		    this.game.map.setCollision([2, 10]);
		    
		    this.game.layerTiles = this.game.map.createLayer('Tiles');
		    this.game.layerObject = this.game.map.createLayer('Objects');
		    this.game.layerLinks = this.game.map.createLayer('Links');

		    //this.game.map.setCollision(2, true, this.game.layerObject);

		    this.game.layerTiles.debug = true;

		    this.game.mapCases = new Map(this.game.map,12,16);
		    this.game.mapCases.init();
		    //this.game.layerObject.debug = true;
			
			podsManager.create(this.game.mapCases);
			blocsManager.create(this.game.mapCases);
			SwitchManager.create(this.game.mapCases);
			DoorManager.create(this.game.mapCases);
			TeleporteurManager.create(this.game.mapCases);
		    ConsoleManager.create(this.game.mapCases);
		    // Faire ça au click sur un pod
		    //Player.create();

		    this.game.gameState = 'readyToPlay';
		},

		update: function(){
			// console.log('Game Update');

			if(this.game.gameState == "play"){
				DoorManager.update();
				SwitchManager.update();
				ConsoleManager.update();
				if(Player.isReady){
					Player.update();
				}
			}

		},

		render: function(){
			// console.log('Game Render');
			if(Player.isReady){
				Player.render();
			}
		}
	});
	
});