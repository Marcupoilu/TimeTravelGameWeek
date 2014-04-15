define(function(require){

	var Pod = require('./pod');

	var podManager = {
		preload : function(){
			Game.load.image('pod', '../images/spawn.png');
		},

		create : function(map){
			var _this = this;
			this.pods = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				_.each(_.where(objectLayer, {type: 'pod'}), function(pod){
					_this.pods.push(pod);
				});
			});

			_.each(this.pods, function(pod){
				new Pod(pod.x*64, pod.y*64);
			});

		}
	}

	return podManager;
});