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
            this.blocsTiles = [];
            this.blocsTable = [];
            var objectsLayer = map.layer3;
            _.each(objectsLayer, function(objectLayer)
            {
                _.each(_.where(objectLayer, {type: 'bloc'}), function(bloc)
                {
                    _this.blocsTiles.push(bloc);
                });
            });

            _.each(this.blocsTiles, function(bloc)
            {
                _this.blocsTable.push(new Bloc(bloc.x*64, bloc.y*64,{lineNb : bloc.x ,columnNb : bloc.y}));
            });

            console.log(this.blocsTable);
        },

        update: function()
        {
            var _this = this;
            _.each(this.blocsTable, function(bloc)
            {
                Game.debug.body(bloc.sprite);   
            });
        },

        moveBlocs: function(){
            _.each(this.blocsTable, function(bloc){
                bloc.autoMove();
            });
        }
    }
    return blocManager;
});