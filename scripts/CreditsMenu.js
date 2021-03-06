define(function(require) {

	var CreditsMenu = {
		preload: function(){
			Game.load.image('credits', './images/menu/credits.png');

			this.style = { font: "30px Terminal", fill: "#fff", 'text-align': 'center', width: '100px'};
		},

		create: function(){
			this.bgSprite = Game.add.sprite(0,0, 'credits');

			this.backBt = Game.add.button(Game.world.width - 235, Game.world.height - 88, 'inv', this.onBack, this);
		  	this.tbackBt = Game.add.text(Game.world.width - 150, Game.world.height - 50, 'Retour', this.style);

		 	Game.sprites.push(this.bgSprite);
		},

		update: function(){
			var _this = this;
		},

		onBack: function(){
			console.log("on back");
			this.bgSprite.visible = false;
			this.backBt.visible = false;
			this.tbackBt.visible = false;
		},

		onDestroy: function(){
			Player.isReady = false;
			_.each(this.destroyArray, function(toDestroy){
				toDestroy.destroy();
			});
		}
	};

	return CreditsMenu;
});