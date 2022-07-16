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
        this.s = 1; // experimental shader, multiplies rgb values
        this.color = this.concatRGBA(r,g,b,a,this.s);
        this.passable = passable;
	}

    // not sure this should live here..
    // works for now
    concatRGBA(r,g,b,a,s){
        return "rgba("+Math.floor(r*s)+","+Math.floor(g*s)+","+Math.floor(b*s)+","+a+")";
    }

    draw(){
        drawChar(this.char, this.color, this.x,this.y);
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
        this.fov=[];    // last known field of view
                        // feel dumb tracking this per actor.. 
                        // maybe only need one for player or global
    }
    

    // i feel like I should be doing the FOV update 
    // on the map instead of on the actor
    updateFOV(){
        let maxDistance = 5;
        let that=this; // bullshit context dropping crap
                       // learn to use "factory functions"
                       // which should avoid this shit
                       // or learn how arrow functions work
        let row = 0;
        let col = 0;

        // go through the fov array and make previously seen things invisible
        for (let i=that.fov.length-1;i>=0;i--){
            gameMap.visible[that.fov[i].x][that.fov[i].y]=false;
            that.fov.pop();
        };
        
        // this will process an quadrant
        // a 90deg slice of the map radiating from the pov position
        // row and col being seperate from x y should
        // allow this to be changed to an octant implementation later
        function updateQuad(dr,dc){
            for (let row = 0; Math.abs(row) <= maxDistance; row=row+dr) {
                // using distance formula here makes this a circle instead of a square
                for (let col = 0; distance(0,0,row,col) <= maxDistance; col=col+dc) {
                    var x = that.x + col;
                    var y = that.y - row;
                
                    if (gameMap.inBounds(x,y)){
                        gameMap.visible[x][y]=true;
                    
                        // add visible tiles to current 
                        // fov for easy cleanup
                        that.fov.push({
                            "x":x,
                            "y":y})
                    }
                }
            }
        }
        
        // for each quadrant, process with transformed row and column
        // changing this to octants will require being able to transpose row&col
        for (let quad=0; quad<8; quad++){
            switch (quad){
                case 0: 
                    updateQuad( 1, -1);
                    break;
                case 1: 
                    updateQuad( 1, 1);
                    break;
                case 2: 
                    updateQuad( -1,  1);
                    break;
                case 3: 
                    updateQuad( -1,  -1);
                    break;
            }
        }
    }

    move(dx,dy){
        // tutorial wants the test for 
        // passable squares to be 
        // moved to engine.js
        if( gameMap.inBounds(this.x+dx, this.y+dy) && gameMap.tiles[this.x+dx][this.y+dy].passable===true) {
            this.x += dx;
            this.y += dy;
        };

        //if(this==player){
        //    this.updateFOV();
        //}
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
        super(x, y, null, 51,51,51,1,/*"#333333",*/ true, true, false);
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
// solid block/white has major antialiasing issues..
// hard on eyes until pixel-perfect rendering is implemented somehow
class Hull extends Tile{
    constructor(x,y){
        super(x, y, "\u2592",/*"\u2588",*/ 255,255,255,1,/* 102,102,102,1,*//*"#666666",*/ false, false, true);
    }
}

// variable alpha layer shader
class Shadow extends Tile{
    constructor(x,y,a){
        super(x, y, " ", 100,0,0,a, true, true, true);
    }

    // runs every frame like draw() except for overlay
    shade(map){
        if (map.tiles[this.x][this.y].constructor.name!="Space"){ //maybe should use getTile() here instead?
            ctx.fillStyle=this.color;
            ctx.fillRect(this.x*tileSize,this.y*tileSize,tileSize, tileSize);
        }
    }
}

/*  shader gradient falloff thing

            // placeholder maxDistance and fillStyle
            // this section probably needs to live somewhere else
            // attempting gradiant dropoff based on distance
            let maxDistance = 7;
            let n=distance(player.x, player.y, this.x, this.y);
            if (n<=maxDistance && n > maxDistance*0.75){
                ctx.fillStyle="rgba(100,0,0,0.4)";
                ctx.fillRect(this.x*tileSize,this.y*tileSize,tileSize, tileSize);
            }
*/