define(function(require) {
	var Teleporteur = function(x, y)
	{
		this.x = x;
		this.y = y;

		this.setTarget = function(target){
			this.target = target;
		}
	}

	return Teleporteur;
});