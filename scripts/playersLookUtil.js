define(function(require) {

	//Player = require('./Player');
	
	var util = {
		getLook: function(object, dircetion){
			var startLook = object || Player.currCase;
			var direction = {
				x: 0,
				y: 1
			}
			var lookAxe = 'y' || 'x';
			var look = []; // array de case

			console.log(Game.mapCase.layer1);
			_.each(Game.mapCase.layer1, function(currCases){
				_.each(currCases, function(currCase){
					if(currCase[lookAxe] == startLook[lookAxe]){
						look.push(currCase);
					}
				});
			});

			console.log('getLook', look);
		},

		checkLook: function(){
			this.getLook();
		}
	}

	return util;
});