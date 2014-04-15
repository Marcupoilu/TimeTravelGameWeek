define(function(require) {
	var Case = require("./Case");
	var Player = require('./Player');

	return new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
			this.load.tilemap('test', 'Assets/Levels/mapTest.json', null, Phaser.Tilemap.TILED_JSON);

    		//  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    		this.load.image('tiles', 'Assets/typeOfCase.png');
    		Player.preload();
		},

		create: function(){
			console.log('Game Create');

			this.stage.backgroundColor = '#787878';

		    //  The 'mario' key here is the Loader key given in game.load.tilemap
		    this.map = this.add.tilemap('test');

		    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
		    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
		    this.map.addTilesetImage('typeOfCase', 'tiles');
		    
		    //  Creates a layer from the World1 layer in the map data.
		    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
		    var layerTiles = this.map.createLayer('Tiles');
		    var layerObject = this.map.createLayer('Objects');

		    //  This resizes the game world to match the layer dimensions

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