requirejs.config({
	paths: {
		lodash : './libs/lodash',
		phaser : './libs/phaser'
	},

	shim : {
		'phaser' : {
			deps : ['lodash'],
			exports : 'phaser'
		}
	}
});

require(['phaser', 'lodash'], function(phaser, _) {
	require(['./scripts/Game'], function(Game) {
		window.Game = Game;
		Game.init();
	});
});
