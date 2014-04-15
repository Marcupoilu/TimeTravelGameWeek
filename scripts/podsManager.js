define(function(require){

	var podManager = {
		preload : function(){
			Game.load.image('pod', '../images/spawn.png');
		},

		create : function(map){
			objectLayer = map.layer2;
			//console.log(map);
		}
	}

	return podManager;
});