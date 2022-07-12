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
    }

    // this is the LOS approach from the tutorial.. 
    visible = [];
    lit = [];

    generateMap(){
        this.tiles = [];
        for(let i=0;i<this.width;i++){
            this.tiles[i] = [];
            for(let j=0;j<this.height;j++){ // fill map with floor tiles
                // remove placeholder boundary and noise
                //if(Math.random() < 0.1 || !this.inBounds(i,j)){ //10% walls or border at boundry
                //    this.tiles[i][j] = new Hull(i,j);
                //}else{
                    this.tiles[i][j] = new Space(i,j);
                //}
            }
        }
        return this.tiles;
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
               this.tiles[i][j].draw();
            }
        }
    }

}