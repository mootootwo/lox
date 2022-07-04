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

    draw(){
        drawChar(this.char,this.color,this.x,this.y);
    }
}

// this is an entity that can perform actions like moving
// it does extend the parent class with new functions
// but since it needs input to define all the paramaters 
// of the parent class, it might be better as 
// its own top level class?
// ^^ question of normalization
class Actor extends Entity{
    constructor(x, y, char, color, passable){
        super(x, y, char, color, passable);
    }

    move(dx,dy){
        // tutorial wants the test for 
        // passable squares to be 
        // moved to engine.js
        if(gameMap.tiles[this.x+dx][this.y+dy].passable===true) {
            this.x += dx;
            this.y += dy;
        };
    }
}

// not sure that this is strictly necessary
// transparent and dark can probably 
// be properties of the parent class
// also I think a tiles x,y property is implied by the map cell it is in
// likely redundant to record it on the tile object?
class Tile extends Entity{
    constructor(x, y, char, color, passable, transparent, dark){
        super(x, y, char, color, passable);
        this.transparent = transparent;
        this.dark = dark;
    }
}

class Floor extends Tile{
    constructor(x,y){
        super(x, y, "\u2219", "#333333", true, true, true);
    }

}

class Wall extends Tile{
    constructor(x,y){
        super(x, y, "\u2592", "#666666", false, false, true);
    }

}

