/* 
tutorial wanted inputs to create objects of specific action classes
I couldn't figure out how that worked

changed actions to simple functions.
made inputs call the functions.
*/

/* unused from tutorial
class Action{}

class EscapeAction extends Action {}

class MoveAction extends Action {
    constructor(dx, dy){
        super();

        this.dx = dx;
        this.dy = dy;
    }
}
*/

function moveAction (dx, dy){
    player.move(dx, dy)
}

function escapeAction (){
    console.log("escape pressed");
}