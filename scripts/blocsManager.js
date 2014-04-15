define(function(require) {
    
    var Bloc = require('./Bloc');

    var blocManager = {
        preload : function()
        {
            Game.load.image('bloc', '../images/spawn.png');
        },

        create : function(map)
        {
            var _this = this;
            this.blocs = [];
            var objectsLayer = map.layer2;
            _.each(objectsLayer, function(objectLayer)
            {
                _.each(_.where(objectLayer, {type: 'bloc'}), function(bloc)
                {
                    _this.blocs.push(bloc);
                });
            });

            _.each(this.pods, function(bloc){
                new Bloc(bloc.x*64, bloc.y*64,{lineNb : x ,columnNb : y});
            });

            console.log(this.blocs);
        }
    }
    return blocManager;
});