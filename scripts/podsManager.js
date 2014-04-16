define(function(require){

	var Pod = require('./pod'),
		Player = require('./Player');

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
					// console.log(pod);
					pods.push(pod);
				});
			});

			console.log(pods);

			_.each(pods, function(pod){
				console.log("this.pods push = ", pod);
				_this.pods.push(new Pod(pod.x*64, pod.y*64, pod));
			});

			console.log('Pods Create', this.pods);
		},

		/*update: function(){
			var _this = this;
			_.each(this.pods, function(pod){
				if(pod.sprite.input.pointerDown()){
					console.log('toto');
					Player.create(pod.startCase);
				}
			});
		}*/
	}

	return podManager;
});