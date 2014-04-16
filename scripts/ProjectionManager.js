define(function(require) {
	var Projection = require("./Projection");
	
	var ProjectionManager = {
		projs: [],
		currentId: -1,

		preload: function(){
			Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(){

		},

		addProjection: function(proj){
			currentId ++;
			proj.create(proj.trajet[0]);
			projs.push(proj);
		},

		addCaseToCurrentProjection: function(proCase){
			if(this.currentId == -1 || this.projs[this.currentId].full)
			{
				this.addProjection(new Projection(proCase));
			}
			projs[this.currentId].addCase(proCase);
		},

		moveAllProj: function(){
			for(var i = 0; i < projs.length; ++i)
			{
				if(i != this.currentId) projs[i].moveToNext();
			}
		}
	}

	return ProjectionManager;
});