requirejs.config({
	paths: {
		lodash : './libs/lodash',
		//phaser : './libs/phaser'
	},

	/*shim : {
		'phaser' : {
			deps : ['lodash'],
			exports : 'phaser'
		}
	}*/
});

require(['lodash'], function(_) {
	require(['./scripts/Game'], function(Game) {
		window.Game = Game;
	});
});
