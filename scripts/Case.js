define(function(require) {
	var Case = function(x, y, type){
		this.x = x || 0;
		this.y = y || 0;
		this.type = type || "";
	}

	return Case;
});