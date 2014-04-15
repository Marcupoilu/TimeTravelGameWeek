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

        this.isMoving = false;
    }

    return Bloc;
});