define(function(require) {

    var Case = require("./Case");

    var typeCase = ["", "ground", "wall", "bloc", "vortex", "slow", "exit", "console", "door_switch", "pod_switch", "direction", "ice", "switch"];

    function parseTiles(map,line,column){
        var cases = [line];
        var tile;
        for(var y = 0; y < line; ++y)
        {
            cases[y] = [column];
            for(var x = 0; x < column; ++x)
            {
                tile = map.layers[0].data[y][x];
                cases[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
            }

        }

        for(var y = 0; y < line; ++y)
        {
            for(var x = 0; x < column; ++x)
            {
                tile = map.layers[1].data[y][x];
                if(tile && tile.index != 0)
                    cases[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
            }

        }

        return cases;
    }

    var Map = function Map(map,line,column)
    {
        this.map = map;
        this.lineNumber = line || 12;
        this.columnNumber = column || 16;
        this.caseTable = [];

        this.init = function()
        {
            this.caseTable = parseTiles(this.map,this.lineNumber,this.columnNumber);
            console.log(this.caseTable);
        }
    }

    return Map;
});