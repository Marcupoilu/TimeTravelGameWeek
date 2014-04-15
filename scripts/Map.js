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

    var Map = function Map(map,line,column)
    {
        this.map = map;
        this.lineNumber = line || 12;
        this.columnNumber = column || 16;
        this.layer1 = [this.lineNumber];
        this.layer2 = [this.lineNumber];

        this.init = function()
        {
            //this.caseTable = parseTiles(this.map,this.lineNumber,this.columnNumber);
            //console.log(this.caseTable);
            for(var y = 0; y < this.lineNumber; ++y)
            {
                this.layer1[y] = [this.columnNumber];
                for(var x = 0; x < this.columnNumber; ++x)
                {
                    tile = map.layers[0].data[y][x];
                    this.layer1[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
                }

            }

            for(var y = 0; y < this.lineNumber; ++y)
            {
                this.layer2[y] = [this.columnNumber];
                for(var x = 0; x < this.columnNumber; ++x)
                {
                    tile = map.layers[1].data[y][x];
                    if(tile && tile.index != 0)
                        this.layer2[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
                    else
                        this.layer2[y][x] = 0;
                }

            }

            console.log(this.layer1);
            console.log(this.layer2);
        }
    }

    return Map;
});