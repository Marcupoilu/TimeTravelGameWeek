define(function(require) 
{
    var Case = require("./Case"),
        TPManager = require("./TeleporteurManager"),
        DoorManager = require("./DoorManager");

    var Bloc = function Bloc(x, y, parent)
    {
        var _this = this;
        this.x = x || 0;
        this.y = y || 0;
        this.caseX = parent.lineNb || 0;
        this.caseY = parent.columnNb || 0;
        console.log('bloc init', parent.lineNb, parent.columnNb);
        this.initPos = {
            x: parent.lineNb,
            y: parent.columnNb
        }
        this.sprite = Game.add.sprite(this.x, this.y, 'bloc');
        Game.sprites.push(this.sprite);
        //add the physics
        Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.y = 0;
        this.sprite.body.bounce.x = 0;
        this.sprite.body.velocity = 0;
        this.sprite.body.setSize(64,64);
        this.sprite.anchor.setTo(0.5, 1);
        this.canMove = true;
        
        this.moveDirection = function(velocity) {
            //console.log('toto', this, this.caseX);
            var velX = velocity.x;
            var velY = velocity.y;
            var goingToMove = false;
            var target = {x : this.caseX, y : this.caseY};
            //console.log("velo",velocity);
            if(velX!=0 || velY!=0)
            {
                target.x += velX;
                target.y += velY;
                goingToMove = true;
            }
            if(goingToMove && this.moveToCase(target.x, target.y, target, velocity))
            {
                this.setNewPosition(target);
                target.x *= 64;
                target.y *= 64;
                this.setTarget(target);
                return true;
            }
            else
            {
                Game.mapCases.layer3[this.caseY][this.caseX] = new Case(this.caseX, this.caseY, "bloc"); 
                goingToMove = false;
                return false;
            }
        }

        this.resetVelocity = function()
        {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        };

        this.resetToInitPos = function(){
            this.sprite.body.x = this.initPos.x * 64;
            this.sprite.body.y = this.initPos.y * 64;
            this.sprite.visible = true;
            this.setNewPosition(this.initPos);
        };

        this.setTarget = function(target, optionCallBack)
        {
            var _this = this;
            this.canMove = false;
            this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
            this.tween.onUpdateCallback(function()
            {
               if(Game.physics.arcade.collide(_this.sprite, Game.layerTiles))
                {
                    _this.tween.stop();
                    _this.resetVelocity();
                    _this.canMove = false;
                }
            });
            this.tween.onComplete.add(function()
            {
                if(optionCallBack){
                    optionCallBack();
                }
                if(Game.mapCases.layer2[this.caseY][this.caseX].type == "vortex"){
                    this.hide();
                }
                this.resetVelocity();
                this.canMove = true;
            }, this);
        }

        this.hide = function(){
            this.sprite.visible = false;
        }

        this.setNewPosition = function(target){
            Game.mapCases.layer3[this.caseY][this.caseX] = new Case(this.caseX, this.caseY, ""); 
            this.caseX = target.x;
            this.caseY = target.y;
            Game.mapCases.layer3[this.caseY][this.caseX] = new Case(this.caseX, this.caseY, "bloc");
            this.x = target.x*64;
            this.y = target.y*64;
        };

        this.moveToCase = function(idX, idY, target, velocity)
        {
            var future = Game.mapCases.layer2[idY][idX];
            var futureBloc = Game.mapCases.layer3[idY][idX];
            //Game.mapCases.layer2[idX][idY] = new Case(idX,idY,"bloc");

            if(future.type == "teleport")
            {
                
                //this.setTarget(target, function(){
                var tp = _.findWhere(TPManager.teleporteurs, {x: future.x, y: future.y});
                if(tp){
                    target.x = tp.target.x + velocity.x;
                    target.y = tp.target.y + velocity.y;

                    this.sprite.body.x = tp.target.x * 64;
                    this.sprite.body.y = tp.target.y * 64;

                    this.caseX = tp.target.x;
                    this.caseY = tp.target.y;

                    idX = tp.target.x + velocity.x;
                    idY = tp.target.y + velocity.y;

                    future = Game.mapCases.layer2[idY][idX];
                    futureBloc = Game.mapCases.layer3[idY][idX];
                }
                //});
                //return;
            }

            var move = false;
            if(future.type == "door")
            {
                var doorToCheck = _.findWhere(DoorManager.doorsObject, {x:future.x*64, y:future.y*64});
                if(doorToCheck.opened){
                    //console.log(open);
                    move = true;
                } else {
                    move = false;
                }
                return move;
            }

            if(future.type == 'ice'){
                this.iceVelocity = velocity;
                move = true;
                return move;
            }

            if(future.type == 'vortex' ||
               future.type == 'pod' ||
               future.type == 'switch'){
                return true;
            }

            if(futureBloc.type == "bloc")
            {
                move = false;
                return move;
            }
            if (future.type.indexOf('direction')>= 0){
                //console.log('move on direction');
                move = true;
                return move;
            }
            //s'il n'y a pas d'objets sur la case on check le layer1
            if(future.type == "")
            {
                future = Game.mapCases.layer1[idY][idX];
                //console.log('block future', future);
                if(future.type == "ground")
                    move = true;
            }
            else
            {
                //console.log('block move false');
                move = false;
            }
            
            return move;
        };

        this.autoMove = function(){
            //console.log('auto move');
            var currCase = Game.mapCases.layer2[this.caseY][this.caseX];
            var nextCase = undefined;
            if (currCase.type == 'direction_right'){
                nextCase = Game.mapCases.layer1[this.caseY][this.caseX+1];
            } else if (currCase.type == 'direction_bottom'){
                nextCase = Game.mapCases.layer1[this.caseY+1][this.caseX];
            } else if (currCase.type == 'direction_left'){
                nextCase = Game.mapCases.layer1[this.caseY][this.caseX-1];
            } else if (currCase.type == 'direction_up'){
                nextCase = Game.mapCases.layer1[this.caseY-1][this.caseX];
            } else if (currCase.type == 'ice' && this.iceVelocity) {
                nextCase = Game.mapCases.layer1[this.caseY + this.iceVelocity.y][this.caseX + this.iceVelocity.x];
            } else {
                this.iceVelocity = undefined;
            }

            if(nextCase && nextCase.type != 'wall'){

                if(nextCase.type == "vortex"){
                    this.sprite.visible = false;
                }
                //console.log('auto moveDirection');
                this.setTarget({
                    x: nextCase.x*64,
                    y: nextCase.y*64
                });

                this.setNewPosition(nextCase);
            }
        };
    }

    return Bloc;
});