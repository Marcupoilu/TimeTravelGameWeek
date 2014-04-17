define(function(require) {
	var Projection = require("./Projection"),
		Timeline = require("./Timeline");
	
	var ProjectionManager = {
		projs: [],
		timelines: [],
		currentId: -1,

		preload: function(){
			Game.load.spritesheet('projection', '../images/gabarit_chara.png', 64, 128, 1);
		},

		create: function(pods){
			/*this.nbProj = pods.length;
			this.projs = [this.nbProj];
			this.timelines = [this.nbProj];

			for(var i = 0; i < nbProj; ++i)
			{
				this.projs[i] = new Projection()
			}*/
		},

		setCurrentProj: function(id){
			this.currentId = id;
			for(var i = id; i < this.projs.length; ++i)
			{
				this.projs[i].clear();
			}
		},

		addProjection: function(proj){
			var y = 20 + this.currentId * 18;
			this.currentId ++;
			proj.create(proj.trajet[0]);
			this.projs.push(proj);

			this.timelines.push(new Timeline(20, y));
			this.timelines[this.currentId].madeAnAction();
		},

		addCaseToCurrentProjection: function(proCase){
			if(this.currentId == -1 || this.projs[this.currentId].full)
			{
				this.addProjection(new Projection(proCase, this.currColor));
			}
			else
			{
				this.projs[this.currentId].addCase(proCase);
				this.timelines[this.currentId].madeAnAction();
			}
		},

		closeCurrentProjection: function(){
			for(var i=0; i < this.projs.length; ++i)
			{
				this.projs[i].reset();
				this.timelines[i].reset();
			}
			this.projs[this.currentId].full = true;
		},

		moveAllProj: function(){
			for(var i = 0; i < this.projs.length; ++i)
			{
				if(i < this.currentId) {
					if(this.projs[i].moveToNext())
						this.timelines[i].madeAnAction();
				}
			}
		}
	}

	return ProjectionManager;
});