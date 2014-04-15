define(function(require) {
	var Case = require("./Case");
	var Player = require('./Player');
	var typeCase = ["", "ground", "wall", "bloc", "vortex", "slow", "exit", "console", "door_switch", "pod_switch", "direction", "ice", "switch"];

	function parseTiles(map){
		var cases = [12];
	    var tile;
	    for(var y = 0; y < 12; ++y)
	    {
	    	cases[y] = [16];
	    	for(var x = 0; x < 16; ++x)
	    	{
	    		tile = map.layers[0].data[y][x];
	    		cases[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
	    	}

	    }

	    for(var y = 0; y < 12; ++y)
	    {
	    	for(var x = 0; x < 16; ++x)
	    	{
	    		tile = map.layers[1].data[y][x];
	    		if(tile && tile.index != 0)
	    			cases[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
	    	}

	    }

		return cases;
	}

	return new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
			this.load.tilemap('test', 'Assets/Levels/mapTest.json', null, Phaser.Tilemap.TILED_JSON);

    		//  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    		this.load.image('tiles', 'Assets/typeOfCase.png');
    		Player.preload();
		},

		create: function(){
			var _this = this;
			console.log('Game Create');
			var _this = this;
			//	Enable p2 physics
			this.physics.startSystem(Phaser.Physics.ARCADE);

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

		    //var cases = parseTiles(this.map);

		    // enable les collisions pour les wall
		    /*_.each(cases, function(tiles){
		    	_this.physics.p2.enable(_.where(tiles, {type: "wall"}));
		    });*/

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