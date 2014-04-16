define(function(require){

	var Pod = require('./pod');

	var podManager = {
		preload : function(){
			Game.load.image('pod', '../images/spawn.png');
		},

		create : function(map){
			var _this = this;
			this.pods = [];
			var pods = [];
			var objectsLayer = map.layer2;

			_.each(objectsLayer, function(objectLayer){
				_.each(_.where(objectLayer, {type: 'pod'}), function(pod){
					pods.push(pod);
				});
			});

			_.each(this.pods, function(pod){
				_this.pods = new Pod(pod.x*64, pod.y*64);
			});

			console.log(this.pods);
		},

		update: function(){
			var _this = this;
			_.each(this.pods, function(pod){
				if(pod.sprite.input.pointerDown()){

				}
			});
		}
	}

	return podManager;
});