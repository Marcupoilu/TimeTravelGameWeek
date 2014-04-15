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
			this.game.load.tilemap('test', 'Assets/Levels/mapTest.json', null, Phaser.Tilemap.TILED_JSON);

    		//  Next we load the tileset. This.game is just an image, loaded in via the normal way we load images:

    		this.game.load.image('tiles', 'Assets/typeOfCase.png');
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
		    this.game.map.setCollision(2);
		    
		    this.game.layerTiles = this.game.map.createLayer('Tiles');
		    this.game.layerObject = this.game.map.createLayer('Objects');

		    this.game.map.setCollision(2, true, this.game.layerObject);

		    this.game.layerTiles.debug = true;
		    //this.game.layerObject.debug = true;

		    var cases = parseTiles(this.game.map);

		    console.log('Map Create', this.game.map);
			
		    Player.create();
		},

		update: function(){
			// console.log('Game Update');
			Player.update();
			//console.log(this.game.map);
			//console.log(Player.sprite);
			this.game.physics.arcade.collide(Player.sprite, this.game.layerTiles, function(object1, object2){
				console.log('Collide', object1, object2);
			}, null, this);
		},

		render: function(){
			// console.log('Game Render');
			Player.render();
		}
	});
	
});