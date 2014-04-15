define(function(require) {
	var Map = require("./Map");
	var Player = require('./Player');
	var podsManager = require('./podsManager');
	

	return new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
			this.game.load.tilemap('test', 'Assets/Levels/mapTest.json', null, Phaser.Tilemap.TILED_JSON);

    		//  Next we load the tileset. This.game is just an image, loaded in via the normal way we load images:

    		this.game.load.image('tiles', 'Assets/typeOfCase.png');
    		podsManager.preload();
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
		    this.game.map.setCollision([2, 10]);
		    
		    this.game.layerTiles = this.game.map.createLayer('Tiles');
		    this.game.layerObject = this.game.map.createLayer('Objects');

		    //this.game.map.setCollision(2, true, this.game.layerObject);

		    this.game.layerTiles.debug = true;

		    this.game.mapCases = new Map(this.game.map,12,16);
		    this.game.mapCases.init();
		    //this.game.layerObject.debug = true;
			
			podsManager.create(this.map);
		    Player.create();
		},

		update: function(){
			// console.log('Game Update');
			Player.update();
		},

		render: function(){
			// console.log('Game Render');
			Player.render();
		}
	});
	
});