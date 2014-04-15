define(function(require) {

    var Case = require("./Case");

    var typeCase = {
        0: '',
        1: 'ground',
        2: 'wall',
        3: 'bloc',
        4: 'vortex',
        5: 'slow',
        6: 'exit', 
        7: 'console',
        8: 'door_switch',
        9: 'pod_switch',
        10: 'direction',
        11: 'ice',
        12: 'switch'
    }

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