define(function(require) 
{
    var Case = require("./Case");
    var DoorManager = require("./DoorManager");

    var Bloc = function Bloc(x, y, parent)
    {
        var _this = this;
        this.x = x || 0;
        this.y = y || 0;
        this.caseX = parent.lineNb || 0;
        this.caseY = parent.columnNb || 0;
        this.sprite = Game.add.sprite(this.x, this.y, 'bloc');
        //add the physics
        Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.y = 0;
        this.sprite.body.bounce.x = 0;
        this.sprite.body.velocity = 0;
        this.sprite.body.setSize(64,64);
        this.canMove = true;
        this.moveDirection = function(velocity)
        {
            console.log('toto', this, this.caseX);
            var velX = velocity.x;
            var velY = velocity.y;
            var goingToMove = false;
            var target = {x : this.caseX, y : this.caseY};
            console.log("velo",velocity);
            if(velX!=0 || velY!=0)
            {
                target.x += velX;
                target.y += velY;
                goingToMove = true;
            }
            if(goingToMove == true && this.moveToCase(this.caseX,this.caseY,target))
            {
                Game.mapCases.layer3[this.caseY][this.caseX] = new Case(this.caseX, this.caseY, ""); 
                //console.log("case", Game.mapCases.layer2[this.caseX][this.caseY]);
                this.caseX = target.x;
                this.caseY = target.y;
                Game.mapCases.layer3[this.caseY][this.caseX] = new Case(this.caseX, this.caseY, "bloc"); 
                console.log('target',target);
                target.x *= 64;
                target.y *= 64;
                this.x = target.x;
                this.y = target.y;
                this.setTarget(target);
                return true;
            }
            else
                return false;
        }
        this.resetVelocity = function()
        {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        },

        this.setTarget = function(target)
        {
            var _this = this;
            var lastPos = {
                x: this.sprite.body.x,
                y: this.sprite.body.y
            }
            console.log("youpi", target);
            this.canMove = false;
            this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
            /*this.tween.onUpdateCallback(function()
            {
               if(Game.physics.arcade.collide(_this.sprite, Game.layerTiles))
                {
                    console.log('colide');
                    _this.tween.stop();
                    _this.resetVelocity();
                    _this.canMove = true;
                }
            });*/
            this.tween.onComplete.add(function()
            {
                this.resetVelocity();
                this.canMove = true;
            }, this);
        },
        this.moveToCase = function(idX, idY, target)
        {
            
            var future = Game.mapCases.layer2[idY][idX];
            //Game.mapCases.layer2[idX][idY] = new Case(idX,idY,"bloc");
            var move = false;
            if(future.type == "door")
            {
                var doorToCheck = _.findWhere(DoorManager.doorsObject, {x:future.x*64, y:future.y*64});
                if(doorToCheck.opened)
                    console.log(open)
                else
                    return;
            }
            //gestion des blocs
            /*if(future.type == "bloc")
            {
                var blocToCheck = _.findWhere(BlocsManager.blocsTable, {x:future.x*64, y:future.y*64});
                if(blocToCheck.isMoving)
                    console.log("move")
                else
                    return
            }*/
            //s'il n'y a pas d'objets sur la case on check le layer1
            if(future.type == "")
            {
                future = Game.mapCases.layer1[idY][idX];
                if(future.type == "ground")
                    move = true;
            }
            else
                move = true;
            
            //pour que le check des collisions se fasse quand même
            /*this.sprite.body.velocity.x = idX - this.caseX;
            this.sprite.body.velocity.y = idY - this.caseY;*/

            /*target.x += 64 * this.sprite.body.velocity.x;
            target.y += 64 * this.sprite.body.velocity.y;*/
            
            return move;
        }
    }

    return Bloc;
});