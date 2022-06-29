class Action{}

class EscapeAction extends Action {}

class MoveAction extends Action {
    constructor(dx, dy){
        super();
        
        this.dx = dx;
        this.dy = dy;
    }
}