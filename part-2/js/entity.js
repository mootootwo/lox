/* 
high level game object
anything that can be represented 
on the map might desecend from this
*/

class Entity{
	constructor(x, y, char, color, passable){
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = color;
        this.passable = passable;
	}

}

// this is an entity that can perform actions like moving
// it does extend the parent class with new functions
// but since it needs input to define all the paramaters 
// of the parent class, it might be better as 
// its own top level class?
class Actor extends Entity{
    constructor(x, y, char, color, passable){
        super(x, y, char, color, passable);
    }
    move(dx,dy){
        this.x += dx;
        this.y += dy;
    }
}


