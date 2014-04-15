define(function(require){
	var Player = {
		init: function(){
			this.initInputs();
		},

		initInputs: function(){
			console.log('Player Init Inputs');
			this.cursors = Game.input.keyboard.createCursorKeys();
		},

		checkInputs: function(){
			if (this.cursors.up.isDown) {
		    	console.log('up');

		    } else if (this.cursors.down.isDown) {
		    	console.log('down');

		    } else if (this.cursors.left.isDown) {
		    	console.log('left');

		    } else if (this.cursors.right.isDown) {
		    	console.log('right');

		    }
		},

		update: function(){
			this.checkInputs();
		},

		render: function(){

		}
	}

	return Player;
});