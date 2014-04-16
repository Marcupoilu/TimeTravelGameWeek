define(function(require) {
	
	var ProjectionManager = {
		projs: [],
		preload: function(){
			Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){

		},

		addProjection: function(proj){
			proj.create(proj.trajet[0]);
			projs.push(proj);
		},

		moveAllProj: function(){
			for(var i = 0; i < projs.length; ++i)
			{
				projs[i].moveToNext();
			}
		}
	}

	return ProjectionManager;
});