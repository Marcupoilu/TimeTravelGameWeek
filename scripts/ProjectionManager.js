define(function(require) {
	var Projection = require("./Projection"),
		Timeline = require("./Timeline");
	
	var ProjectionManager = {
		projs: [],
		timelines: [],
		currentId: -1,
		maxActions: -1,

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

		addProjection: function(proj, max){
			var y = 20 + this.currentId * 18;
			this.currentId ++;
			proj.create(proj.trajet[0]);
			this.projs.push(proj);

			this.timelines.push(new Timeline(20, y, Player.maxActions + 1));
			this.timelines[this.currentId].madeAnAction();
		},

		addCaseToCurrentProjection: function(proCase){
			if(this.currentId == -1 || this.projs[this.currentId].full)
			{
				var idProj = this.checkIfAlreadyProj(proCase);
				if(idProj != -1)
				{
					// console.log("on a déjà une projection sur ce pod");
					this.reverseTimelines(idProj);
				}
				//else
				this.addProjection(new Projection(proCase, this.currColor));

			}
			else
			{
				this.projs[this.currentId].addCase(proCase);
				this.timelines[this.currentId].madeAnAction();
			}
		},

		reverseTimelines: function(id){
			for(var i = id; i < this.projs.length; ++i)
			{
				this.projs[i].clear();
				this.timelines[i].clear();
			}
			this.projs.splice(id, this.projs.length - id);
			this.timelines.splice(id, this.timelines.length - id);
			this.currentId = id - 1;
		},

		resetAll: function(){
			for(var i = 0; i < this.projs.length; ++i)
			{
				this.projs[i].clear();
				// this.timelines[i].clear();
			}
			this.projs.splice(0, this.projs.length);
			this.timelines.splice(0, this.timelines.length);
			this.currentId = -1;
		},

		checkIfAlreadyProj: function(onCase){
			var id = -1;
			for(var i = 0; i < this.projs.length; ++i)
			{
				if(this.projs[i].trajet[0].x == onCase.x && this.projs[i].trajet[0].y == onCase.y)
					id = i;
			}
			return id;
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