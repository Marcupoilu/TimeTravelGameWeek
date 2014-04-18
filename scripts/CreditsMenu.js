define(function(require) {

	var WinMenu = {
		preload: function(){
			Game.load.image('credits', '../images/credits.png');
		},

		create: function(){
			this.bgSprite = Game.add.sprite(0,0, 'credits');

		 	Game.sprites.push(this.bgSprite);
		},

		update: function(){
			var _this = this;
		},

		onClickMainMenu: function(){
			MainMenu.create();
		},

		onClickNextLevel: function(){
			this.onDestroy();
			Game.currentLevel++;
			Game.loadLevel(Game.currentLevel);
		},

		onDestroy: function(){
			Player.isReady = false;
			_.each(this.destroyArray, function(toDestroy){
				toDestroy.destroy();
			});
		}
	};

	return WinMenu;
});