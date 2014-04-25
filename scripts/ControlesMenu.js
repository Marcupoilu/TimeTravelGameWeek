define(function(require) {

	var ControlesMenu = {
		preload: function(){
			Game.load.image('controles', './images/menu/controlesMenu.png');

			this.style = { font: "30px Terminal", fill: "#fff", 'text-align': 'center', width: '100px'};
		},

		create: function(){
			this.bgSprite = Game.add.sprite(0,0, 'controles');

			this.backBt = Game.add.button(Game.world.width - 235, Game.world.height - 88, 'inv', this.onBack, this);
		  	this.tbackBt = Game.add.text(Game.world.width - 150, Game.world.height - 50, 'Retour', this.style);

		 	Game.sprites.push(this.bgSprite);
		},

		update: function(){
		},

		onBack: function(){
			console.log("on back");
			this.bgSprite.visible = false;
			this.backBt.visible = false;
			this.tbackBt.visible = false;
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

	return ControlesMenu;
});