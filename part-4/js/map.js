/* 
creates the game map

the map is a 2d array, 
the location in the array 
is the implicit x,y coords of a tile

tutorial wants the map to be a class...
not sure, but trying it for now
*/

class GameMap {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.tiles = this.generateMap(this.width, this.height);
        this.visible = this.initVisible(this.width, this.height);
        this.shadow = this.initShadow(this.width, this.height);
    }


    generateMap(){
        this.tiles = [];
        
        for(let i=0;i<this.width;i++){
            this.tiles[i] = [];
            for(let j=0;j<this.height;j++){         
                this.tiles[i][j] = new Space(i,j);  // fill map with space tiles
            }
        }
        return this.tiles;
    }

    initVisible(){
        this.visible = [];  // this is the LOS approach from the tutorial.. 
        for(let i=0;i<this.width;i++){
            this.visible[i] = [];
            for(let j=0;j<this.height;j++){         
                this.visible[i][j] = false;         // populate visible array with false
            }
        }
        return this.visible;
    }

    initShadow(){
        this.shadow = [];   // little bit off the rails from tutorial here
        for(let i=0;i<this.width;i++){
            this.shadow[i] = [];
            for(let j=0;j<this.height;j++){         
                this.shadow[i][j] = new Shadow(i,j,0.5);   // default alpha layer full opacity
            }
        }
        return this.shadow;
    }

    inBounds(x,y){ //checks to see if a tile is within the game area
        return x>=0 && y>=0 && x<(this.width) && y<(this.height);
    }

    getTile(x, y){
        if(this.inBounds(x,y)){
            return this.tiles[x][y];
        }else{
            return new Void; //downstream tests require a valid constructor type to be returned
        }
    }




    draw(){  //draws the map
        for(let i=0;i<this.width;i++){
            for(let j=0;j<this.height;j++){
                this.tiles[i][j].draw();            // draws the tile
                if (this.visible[i][j]===false){    // checks to see if a tile is in the visible array
                    this.shadow[i][j].shade();      // draws a transparent shader over the tile
                } 
            }
        }
    }
 
}