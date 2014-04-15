define(function(require) 
{
    var Bloc = function Bloc(x, y, parent)
    {
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

        this.canMove = true;

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
            this.canMove = false;
            this.tween = Game.add.tween(this.sprite.body).to(target, 200, Phaser.Easing.Linear.None, true);
            this.tween.onUpdateCallback(function()
            {
                if(Game.physics.arcade.collide(_this.sprite, Game.layerTiles))
                {
                    console.log('colide');
                    _this.tween.stop();
                    _this.resetVelocity();
                    _this.canMove = true;
                }
            });
            this.tween.onComplete.add(function()
            {
                this.resetVelocity();
                this.canMove = true;
            }, this);
        },
        this.moveToCase = function(idX, idY, target)
        {
            
            var future = Game.mapCases.layer2[idY][idX];
            var move = false;
            /*if(future.type == "door")
            {
                var doorToCheck = _.findWhere(DoorManager.doorsObject, {x:future.x*64, y:future.y*64});
                if(doorToCheck.opened)
                    console.log(open)
                else
                    return
            }*/
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
            /*if(future.type == "")
            {
                future = Game.mapCases.layer1[idY][idX];
                if(future.type == "ground")
                    move = true;
            }
            else*/
                move = true;
            
            //pour que le check des collisions se fasse quand même
            this.sprite.body.velocity.x = idX - this.caseX;
            this.sprite.body.velocity.y = idY - this.caseY;

            target.x += 64 * this.sprite.body.velocity.x;
            target.y += 64 * this.sprite.body.velocity.y;
            this.setTarget(target);

            if(move)
            {
                this.caseX = idX;
                this.caseY = idY;
            }
        }
    }

    return Bloc;
});