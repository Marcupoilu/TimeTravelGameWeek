define(function(require) {

	//Player = require('./Player');
	
	var util = {
		getLook: function(object, direction){
			var startLook = object;
			var otherAxe = '';
			var lookAxe = (function(){
				if(direction.x != 0){
					otherAxe = 'y';
					return 'x';
				}
				if(direction.y != 0){
					otherAxe = 'x';
					return 'y';
				}
			})()

			var look = []; // array de case

			_.each(Game.mapCases.layer1, function(currCases){
				_.each(currCases, function(currCase){
					if(currCase[otherAxe] == startLook[otherAxe]){
						if(direction[lookAxe] > 0 && currCase[lookAxe] > startLook[lookAxe]){
							look.push(currCase);
						}
						if(direction[lookAxe] < 0 && currCase[lookAxe] < startLook[lookAxe]){
							look.push(currCase);
						}
					}
				});
			});

			look = _.sortBy(look, function(currCase){
				return currCase[lookAxe]*direction[lookAxe];
			});
			var finalLook = [];
			for(var i = 0; i < look.length; i++){
				if(look[i].type != 'wall'){
					finalLook.push(look[i]);
				} else {
					break;
				}
			}

			//console.log('getLook', finalLook);
			return finalLook;
		},

		checkLook: function(look, toChecks){
			var seeOther = false;
			_.each(look, function(lookCase){
				_.each(toChecks, function(obj){
					if(lookCase.x == obj.currCase.x && lookCase.y == obj.currCase.y){
						//console.log('player see projection', lookCase);
						seeOther = true;
					}
				});
			});
			return seeOther;
		}
	}

	return util;
});