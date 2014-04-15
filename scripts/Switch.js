define(function(require) {
	var Switch = function(id, x,y,type){
		this.id = id || 0;
		this.type = type || "";
	};

	this.activate = function(){
		var doorToActivate = _.findWhere(Game.doors, id:this.id);
		doorToActivate.Open();
	};
	return Switch;
});