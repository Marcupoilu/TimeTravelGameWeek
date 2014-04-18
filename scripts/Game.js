define(function(require) {

	var Map = require("./Map"),
	    Player = require('./Player');

	var ProjectionManager = require("./ProjectionManager"),
	    DoorManager = require("./DoorManager"),
	    podsManager = require('./podsManager'),
	    SwitchManager = require("./SwitchManager"),
	    blocsManager = require('./blocsManager'),
	    TeleporteurManager = require('./TeleporteurManager'),
	    ConsoleManager = require("./ConsoleManager"),
	    ExitManager = require("./ExitManager"),
	    WinMenu = require("./WinMenu"),
	    GameOverMenu = require("./GameOverMenu"),
	    MainMenu = require('./mainMenu');

	var lookUtil = require('./playersLookUtil');

	return _.extend(new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
			_this = this;
			this.game.levels = [];
			this.game.currentLevel = 1;
			this.game.sprites = [];
			this.game.menuSprites = [];

			for(var i = 0; i < 9; i++){
				this.game.levels.push(i);	
			}

			_.each(this.game.levels, function(int){
				_this.game.load.tilemap('level'+int, 'Assets/Levels/level'+int+'.json', null, Phaser.Tilemap.TILED_JSON);
			});
    		//  Next we load the tileset. This.game is just an image, loaded in via the normal way we load images:

    		this.game.load.image('tiles', 'Assets/typeOfCase.png');
    		this.game.load.image('linksImg', 'Assets/links.png');
       		this.game.load.image('renderTileSet', 'Assets/renderTileSet.png');
    		this.game.load.image('timelineOn', '../images/ui/time_on.png');
    		this.game.load.image('timelineOff', '../images/ui/time_off.png');
       		this.game.load.image('background', '../images/ground.png');
        	this.game.load.image('ice', '../images/ice.png');
        	this.game.load.image('push_down', '../images/pushDown.png');
        	this.game.load.image('push_up', '../images/pushUp.png');
        	this.game.load.image('push_left', '../images/pushLeft.png');
        	this.game.load.image('push_right', '../images/pushRight.png');
			this.game.load.spritesheet('vortex', '../images/vortex.png', 64, 64, 4);

    		podsManager.preload();
    		DoorManager.preload();
    		SwitchManager.preload();
    		ConsoleManager.preload();
    		blocsManager.preload();
    		ExitManager.preload();
    		WinMenu.preload();
    		GameOverMenu.preload();
  			TeleporteurManager.preload();
    		Player.preload();
    		ProjectionManager.preload();
    		MainMenu.preload();
		},

		create: function(){
			var _this = this;
			console.log('Game Create', this.game);
			//	Enable p2 physics
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			/*this.game.stage.backgroundColor = '#787878';

		    this.game.map = this.game.add.tilemap('level6');
		    this.game.map.addTilesetImage('typeOfCase', 'tiles');
		    this.game.map.addTilesetImage('links', 'linksImg');
		    _this.game.map.addTilesetImage('graphs', 'renderTileSet');
		    this.game.map.setCollision([2, 10]);
		    
		    this.game.layerTiles = this.game.map.createLayer('Tiles');
			// this.backgroundSprite = Game.add.sprite(0, 0, 'background');
			// this.game.sprites.push(this.backgroundSprite);
		    this.game.layerObject = this.game.map.createLayer('Objects');
		    this.game.layerLinks = this.game.map.createLayer('Links');
		    this.game.layerRender = _this.game.map.createLayer('Render');
		    this.game.layerRenderBis = _this.game.map.createLayer('RenderBis');

		    //this.game.map.setCollision(2, true, this.game.layerObject);

		    // this.game.layerTiles.debug = true;

		    this.game.mapCases = new Map(this.game.map,12,16);
		    this.game.mapCases.init();
		    //this.game.layerObject.debug = true;
			
			podsManager.create(this.game.mapCases);
			blocsManager.create(this.game.mapCases);
			SwitchManager.create(this.game.mapCases);
			DoorManager.create(this.game.mapCases);
			TeleporteurManager.create(this.game.mapCases);
		    ConsoleManager.create(this.game.mapCases);
			ProjectionManager.create();
			ExitManager.create(this.game.mapCases);*/
		    // Faire ça au click sur un pod
		    //Player.create();

		    MainMenu.create();
		},

		update: function(){
			// console.log('Game Update');

			if(this.game.gameState == "play"){
				DoorManager.update();
				SwitchManager.update();
				ConsoleManager.update();
				blocsManager.update();
				// this.game.mapCases.update();
				if(Player.created){
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
	}), new function(){
		this.loadLevel = function(int){
			console.log("level"+int);
			
			if(_this.allCreate){
				Player.resetManagers();
				Player.destroy();
				console.log(_this.game.sprites);
				_.each(_this.game.sprites, function(sprite){
					//console.log(sprite);
					if(sprite){
						sprite.destroy();
					}
				});
				_this.game.layerTiles.destroy();
				_this.game.layerObject.destroy();
				_this.game.layerLinks.destroy();
				_this.game.layerRender.destroy();
				// _this.game.layerRenderBis.destroy();
				_this.game.map.destroy();
			} else {
				_.each(_this.game.menuSprites, function(sprite){
					//console.log(sprite);
					if(sprite){
						sprite.destroy();
					}
				});
			}

			//	Enable p2 physics
			_this.game.physics.startSystem(Phaser.Physics.ARCADE);

			_this.game.stage.backgroundColor = '#787878';

		    _this.game.map = _this.game.add.tilemap('level'+int);
		    _this.game.map.addTilesetImage('typeOfCase', 'tiles');
		    _this.game.map.addTilesetImage('links', 'linksImg');
		    _this.game.map.addTilesetImage('graphs', 'renderTileSet');
		    _this.game.map.setCollision([2, 10]);
		    
		    _this.game.layerTiles = _this.game.map.createLayer('Tiles');
			// _this.backgroundSprite = Game.add.sprite(0, 0, 'background');
			// _this.game.sprites.push(_this.backgroundSprite);
		    _this.game.layerObject = _this.game.map.createLayer('Objects');
		    _this.game.layerLinks = _this.game.map.createLayer('Links');
		    _this.game.layerRender = _this.game.map.createLayer('Render');
		    // _this.game.layerRenderBis = _this.game.map.createLayer('RenderBis');

		    //_this.game.map.setCollision(2, true, _this.game.layerObject);
		    _this.game.layerTiles.debug = true;
			_this.game.mapCases = {};
		    _this.game.mapCases = new Map(_this.game.map,12,16);
		    _this.game.mapCases.init();
		    //_this.game.layerObject.debug = true;
			
			podsManager.create(_this.game.mapCases);
			blocsManager.create(_this.game.mapCases);
			SwitchManager.create(_this.game.mapCases);
			DoorManager.create(_this.game.mapCases);
			TeleporteurManager.create(_this.game.mapCases);
		    ConsoleManager.create(_this.game.mapCases);
			ProjectionManager.create();
			ExitManager.create(_this.game.mapCases);
		    // Faire ça au click sur un pod
		    //Player.create();

		    _this.game.gameState = 'readyToPlay';
		    _this.allCreate = true;
		};

		this.GameOver = function(){
			GameOverMenu.create();
			_this.game.gameState = "GameOver";
		};

		this.Win = function(){
			WinMenu.create();
			_this.game.gameState = "win";
		};

		this.manageAllLook = function(){
			var playerLook = lookUtil.getLook(Player.currCase, Player.sprite.body.velocity);
			//console.log(ProjectionManager, 'playerLook', playerLook);
			_.each(playerLook, function(lookCase){
				_.each(ProjectionManager.projs, function(proj){
					//console.log(proj);
					if(proj.active){
						if(lookCase.x == proj.currCase.x && lookCase.y == proj.currCase.y){
							console.log('player see projection', lookCase);
							//break;
						}
					}
				});
			});

			_.each(ProjectionManager.projs, function(proj){
				if(proj.active){
					projLook = lookUtil.getLook(proj.currCase, proj.lookDirection);
					if(lookUtil.checkLook(projLook, _.reject(ProjectionManager.projs, proj)) || 
						lookUtil.checkLook(projLook, [Player])){
						console.log('proj see something');
					}
				}
			});
			//console.log(ProjectionManager);
		};

		this.playerMove = function(){
			blocsManager.moveBlocs();
		};

		this.playerDisappear = function(){
			blocsManager.resetPos();
		};
	});
	
});