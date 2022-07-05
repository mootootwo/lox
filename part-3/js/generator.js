/* 
This holds the procgen systems
that create the features of our map
and lay them out.

map.js is used to put these features on the grid
*/

class RectModule{
	constructor(x1, y1, width, height){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x1+width-1;
        this.y2 = y1+height-1;
        this.ports = this.connectionPorts();
    }

    // needs something to define and return the center?
    // may not use that, depending

    // needs something to define and return the end connection points
    // assumes 3 tile wide module
    connectionPorts(){
        this.ports = [];
        for(let i=0;i<2;i++){
            this.ports[i] = new ConnectionPort();
        }
        // needs something to maybe add connection points to the sides
        return this.ports;
    }
}

class ConnectionPort extends Entity{
    constructor(x,y){
        super(x, y, "\u2261", "#666666", false, false, true);
    }
}

// merges a module onto the station map
// converts map tiles to walls based on module definition
function mergeModule(map,module){
    for(let i=module.x1;i<=module.x2;i++){
        for(let j=module.y1;j<=module.y2;j++){
            map.tiles[i][j] = new Wall(i,j);
        }
    }
}   


// TODO: move this to a utility.js
// generates a random number between a given min and max
function randomRange(min,max){
    let n = Math.floor(Math.random() * (max-min) ) + min;
    return n;
}

// creates a gamemap to hold the station
// generates modules
// merges those modules onto the map
// returns the completed map
function generateStation(mapWidth, mapHeight){
    modules = [];
    let maxModules = 5;
    let minModules = 3;
    let maxModX = 3;
    let minModX = 3;
    let maxModY = 7;
    let minModY = 3;
    let station = new GameMap(xTiles, yTiles);

    // generate first module

    // check for available connection

    // check for space to place module
    
    // after all modules placed, replace open connections with docks

    for(let i=0;i<maxModules;i++){
        modules[i] = new RectModule((i+1)*5, (i+1)*5, randomRange(minModX, maxModX), randomRange(minModY, maxModY));
        mergeModule(station,modules[i]);
    }

    return station;
}

