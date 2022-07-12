/* 
high level game object
anything that can be represented 
on the map might desecend from this
*/

class Entity{
	constructor(x, y, char, r,g,b,a, passable){
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = this.concatRGBA(r,g,b,a);
        this.passable = passable;
	}

    // not sure this should live here..
    // works for now
    concatRGBA(r,g,b,a){
        return "rgba("+r+","+g+","+b+","+a+")";
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
    constructor(x, y, char, r,g,b,a,/*color,*/ passable){
        super(x, y, char, r,g,b,a,/*color,*/ passable);
    }

    move(dx,dy){
        // tutorial wants the test for 
        // passable squares to be 
        // moved to engine.js
        if( gameMap.inBounds(this.x+dx, this.y+dy) && gameMap.tiles[this.x+dx][this.y+dy].passable===true) {
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
    constructor(x, y, char, r,g,b,a, passable, transparent, dark){
        super(x, y, char, r,g,b,a, passable);
        this.transparent = transparent;
        this.dark = dark;
    }
}


class Space extends Tile{
    constructor(x,y){
        super(x, y, null, 51,51,51,1,/*"#333333",*/ true, true, true);
        this.char = this.decorate();
    }
    decorate(){ // usually blank but with a chance of having a star
        if (Math.random()>0.01){
           // return "\u2219"
           return "";
        } else {
            return "\u263c";
        }
    }
}

// used for out of bounds tiles
class Void extends Tile{
    constructor(){super()}
}

// TODO: change to solid block and white
class Hull extends Tile{
    constructor(x,y){
        super(x, y, "\u2592", 102,102,102,1,/*"#666666",*/ false, false, true);
    }

}

