define(function(require) 
{
    var Bloc = function Bloc(x, y, parent)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.caseX = parent.lineNb || 0;
        this.caseY = parent.columnNb || 0;
        this.sprite = Game.add.sprite(x, y, 'bloc');
    }

    return Bloc;
});