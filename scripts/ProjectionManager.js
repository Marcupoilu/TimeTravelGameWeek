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
			this.currentId ++;
			proj.create(proj.trajet[0]);
			this.projs.push(proj);
		},

		addCaseToCurrentProjection: function(proCase){
			if(this.currentId == -1 || this.projs[this.currentId].full)
			{
				this.addProjection(new Projection(proCase));
			}
			else
				this.projs[this.currentId].addCase(proCase);
		},

		closeCurrentProjection: function(){
			this.projs[this.currentId].full = true;
		},

		moveAllProj: function(){
			for(var i = 0; i < this.projs.length; ++i)
			{
				if(i != this.currentId) this.projs[i].moveToNext();
			}
		}
	}

	return ProjectionManager;
});