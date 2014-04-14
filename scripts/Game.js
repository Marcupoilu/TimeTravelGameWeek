define(function(require) {

	return new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
		preload: function(){
			console.log('Game Preload');
		},

		create: function(){
			console.log('Game Create');
		},

		update: function(){
			console.log('Game Update');
		},

		render: function(){
			console.log('Game Render');
		}
	});
});