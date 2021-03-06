define(function(require) {

    var Case = require("./Case");

    var typeCase = {
        0: '',
        1: 'ground',
        2: 'wall',
        3: 'bloc',
        4: 'vortex',
        5: 'pod',
        6: 'slow', 
        7: 'exit',
        8: 'console',
        9: 'switch',
        10: 'door_face',
        11: 'direction_up',
        12: 'direction_bottom',
        13: "direction_right",
        14: "direction_left",
        15: "fast",
        16: "ice",
        17: "teleport",
        18: "door_profil"
    }

    var Map = function Map(map,line,column)
    {
        this.map = map;
        this.map.vortexes = [];
        this.map.pushUps = [];
        this.lineNumber = line || 12;
        this.columnNumber = column || 16;
        this.layer1 = [this.lineNumber];
        this.layer2 = [this.lineNumber];
        this.layer3 = [this.lineNumber];

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
                    if(tile && tile.index != 0){
                        this.layer2[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
                        switch(tile.index)
                        {
                            case 16:
                                var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'ice');
                                Game.sprites.push(sprite);
                            break;
                            case 4:
                                var spritesheetVort = Game.add.sprite(tile.x * 64, tile.y * 64, "vortex");
                                spritesheetVort.animations.add('idle', [0, 1, 2, 3]);
                                spritesheetVort.animations.play("idle",3, true);
                                this.map.vortexes.push(spritesheetVort);
                            break;
                            case 11:
                                var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'push_up');
                                Game.sprites.push(sprite);
                            break;
                            case 12:
                                var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'push_down');
                                Game.sprites.push(sprite);
                            break;
                            case 13:
                                var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'push_right');
                                Game.sprites.push(sprite);
                            break;
                            case 14:
                                var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'push_left');
                                Game.sprites.push(sprite);
                            break;
                            default:
                        }
                        /*if (tile.index == 16){
                            var sprite = Game.add.sprite(tile.x*64, tile.y*64, 'ice');
                            Game.sprites.push(sprite);
                        }
                        if (tile.index == 4){
                            var spritesheetVort = Game.add.sprite(tile.x * 64, tile.y * 64, "vortex");
                            spritesheetVort.animations.add('idle', [0, 1, 2, 3]);
                            spritesheetVort.animations.play("idle",3, true);
                            this.map.vortexes.push(spritesheetVort);
                        }*/
                    }
                    else
                        this.layer2[y][x] = new Case(x, y, "");
                }

            }

            for(var y = 0; y < this.lineNumber; ++y)
            {
                this.layer3[y] = [this.columnNumber];
                for(var x = 0; x < this.columnNumber; ++x)
                {
                    tile = map.layers[3].data[y][x];
                    if(tile && tile.index != 0)
                        this.layer3[y][x] = new Case(tile.x, tile.y, typeCase[tile.index]);
                    else
                        this.layer3[y][x] = new Case(x, y, "");
                }

            }

            //console.log(this.layer1);
            //console.log(this.layer2);
            //console.log("layer",this.layer3);
        }

        this.update = function(){
            for(var i = 0; i < this.map.vortexes.length; i++){
                spritesheetVort.animations.play("idle");
            }
        }
    }

    return Map;
});