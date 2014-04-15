define(function(require) {

    var blocManager = {
        preload : function()
        {
            Game.load.image('bloc', '../images/bloc.png');
        },

        create : function(map)
        {
            this.blocs = [];
        }
    }
    var Bloc = function Bloc(x, y, case)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.caseX = case.x || 0;
        this.caseY = case.y || 0;
    }

    return blocManager;
});