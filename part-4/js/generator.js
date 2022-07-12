/* 
This holds the procgen systems
that create the features of our map
and lay them out.

map.js is used to put these features on the grid
*/

// creates a rectangular map feature
// representing a module of a space station
// will have connection ports on the ends
// to join up with other modules
class RectModule{
	constructor(width, height/*, portList*/){
        this.width = width;
        this.height = height;
        // only need to know parent port for generation, 
        // don't need to save it with the module
        // TODO: fix
        this.parentPort = this.pickParentPort(); // TODO: <-- do this without saving the object
        this.x1 = this.findX1();
        this.y1 = this.findY1();
        this.x2 = this.x1+width-1;
        this.y2 = this.y1+height-1;
        this.ports = this.generatePorts();
        //this.portList = portList; // made this global because passing it wasnt working
    }

    // generates x1 position for module based on parent connection port
    // or centers on map if no parent exist
    findX1(){
        if (this.parentPort) {
            let pdx = modules[this.parentPort.module].ports[this.parentPort.port].dx;
            let px = modules[this.parentPort.module].ports[this.parentPort.port].x;
            switch (pdx){
                case 0: // top or bottom facing port
                    this.x1=px+(pdx)-1;
                    break;
                case -1: // left facing port
                    this.x1=px+(2*pdx)-this.width;
                    break;
                case 1: // right facing port
                    this.x1=px+(2*pdx);
                    break;
            }
        }else { // centers on map if no parent exists
            this.x1 = Math.floor((xTiles-this.width)/2);
        }
        return this.x1;
    }

    // generates y1 position for module based on parent connection port
    // or centers on map if no parent exist
    findY1(){
        if (this.parentPort) {
            let pdy = modules[this.parentPort.module].ports[this.parentPort.port].dy;
            let py = modules[this.parentPort.module].ports[this.parentPort.port].y;
            switch (pdy){
                case 0: // left or right facing port
                    this.y1=py+pdy-1;
                    break;
                case -1: // top facing port
                    this.y1=py+pdy-this.height;
                    break;
                case 1: // bottom facing port
                    this.y1=py+pdy+1;
                    break;
            }
        }else { // centers on map if no parent exists
            this.y1 = Math.floor((yTiles-this.height)/2);
        }
        return this.y1;
    }

    // randomly selects an available (unconnected) port
    // checks for available space in front of that port
    // if not enough space, 
        //converts it to a docking port 
        //and splices from available list
    // if less space than current module
        // shortens the module
    // adds vertex (v) information to the parent port
    // splices parent port from available list
    pickParentPort(){
        let pPort; // parent port
        let n; // how much empty space is available to place a module
        let i; // index of parent port

        if (this.parentPort) {throw "parent port defined in prior recursion";} // TODO: this needs a "catch" statement somewhere
        if (portList.length===0) { return null }; // if this is the first module and no ports exist
        i = randomRange(0,portList.length-1); // pick a random index for a port
        
        pPort = portList[i]; // not sure if we do this here or down in the elseif
        
        n = measureEmpty( // measure available distance from parent port
            modules[pPort.module].ports[pPort.port].x, 
            modules[pPort.module].ports[pPort.port].y, 
            modules[pPort.module].ports[pPort.port].dx, 
            modules[pPort.module].ports[pPort.port].dy,
            this.width,
            this.height,
            station
        )
        
        if (n<3){ // not enough space to place a module
            modules[pPort.module].ports[pPort.port] = new DockingPort( // convert to docking port
                modules[pPort.module].ports[pPort.port].x, 
                modules[pPort.module].ports[pPort.port].y, 
                modules[pPort.module].ports[pPort.port].dx, 
                modules[pPort.module].ports[pPort.port].dy 
            );
            portList.splice(i,1) // splice port out of available list
            
            // TODO: FIX THIS
            // this recursion isnt working
            // after failure it is placing modules at the default centerpoint
            // is failing to pick a new port
            this.pickParentPort(); // recurse and try again
        } else if (n<=this.height){ // enough or too little space for chosen length
            this.height = n;        // if < width, truncate width
            portList.splice(i,1) // splice port out of available list
            return pPort;
        } else { 
            portList.splice(i,1) // splice port out of available list
            return pPort;
        }
    }

    // not currently used
    randomAvailablePort(){ // can remove if else from this, if test exists in pickParentPort()
        if (portList.length>0){
            return portList[randomRange(0,portList.length-1)];
        }else {return null;}
    }

    // needs something to define and return the end connection points
    // assumes 3 tile wide module, but works on other widths
    // needs to append parent port data and not pus
    generatePorts(){
        this.ports = [];
        //TODO: CURRENT ISSUE
        /*
        this needs to identify parent port
        and which of this modules ports are connected to that parent
        and mark that port as connected

        ports will need to know what they are connected to, 
        otherwise will need to be converted to a docking port
        connection ports contain `v` object to hold that data
        */
       
        // this should place a port 
        // on the cernter of the top and bottom
        // of a module.. assuming default (vertical) orientation 
        // TODO: consider making connection opening direction 
        // dynamic rather than prescriptive
        this.ports[0] = new ConnectionPort(
            Math.ceil((this.x2-this.x1)/2+this.x1), // horizontal midpoint
            this.y1, // top
            0, // direction: no change x
            -1,  // direction: up 1
            null // placeholder v value for parent link
        );
        this.ports[1] = new ConnectionPort(
            Math.ceil((this.x2-this.x1)/2+this.x1), // horizontal midpoint
            this.y2, // bottom
            0, // direction: no change x
            1, // direction: down 1
            null // placeholder v value for parent link
        );
            
        // needs something to maybe add connection points to the sides
        
        
        // update parent port to add v-value for local port
        // update local port to add v-value for parent port
        // updates list of all ports to include new unconnected ports
        // TODO: improve this:
        // this is kind of fucked.. 
        // case statement contains hard coded scenarios
        // not modular/functional
        // will not scale or extend
        if (this.parentPort){ 
            switch (this.parentPort.port){ // hardcoded assumptions TODO: improve
                case 0: // assumes 0 is top port
                    modules[this.parentPort.module].ports[this.parentPort.port].v={  // add vertex information to parent
                        "module":modules.length, 
                        "port":1, 
                    }; 
                    this.ports[1].v = {
                        "module":this.parentPort.module, 
                        "port":this.parentPort.port, 
                    };
                    portList.push({ // adds other (nonconnected) port to portList
                        // module.length is kludge TODO: do better
                        "module":modules.length, // what module number is this part of
                        "port":0, 
                    });
                    break;
                case 1: // assumes 1 is bottom port
                    modules[this.parentPort.module].ports[this.parentPort.port].v={  // add vertex information to parent
                        "module":modules.length, 
                        "port":0, 
                    }; 
                    this.ports[0].v = {
                        "module":this.parentPort.module, 
                        "port":this.parentPort.port,  
                    };
                    portList.push({ // adds other (nonconnected) port to portList
                        // module.length is kludge TODO: do better
                        "module":modules.length, // what module number is this part of
                        "port":1, 
                    });
                    break;
            }
        }else{ // should only trigger this for first module
            for (let i=0;i<this.ports.length;i++){
                portList.push({
                    // module.length is kludge TODO: do better
                    "module":modules.length, // what module number is this part of
                    "port":i, // what port index is this on the module
                });
            }
        }
        return this.ports;
    }
}

// this is a connection point between two station modules
class ConnectionPort extends Entity{
    constructor(x,y,dx,dy,v){
        super(x, y, "\u2261", 255,255,255,1,/*"#666666",*/ false, false, true);
        this.x = x;
        this.y = y;
        this.dx = dx; // the direction the port opens in
        this.dy = dy; // the direction the port opens in
        this.v = v; // graph vertex, or link to the next node
    }
}

// this is a port from which vessels (actor entities) can emerge
class DockingPort extends Entity{
    constructor(x,y,dx,dy){
        super(x, y, "\u25d9", 255,255,255,1,/*"#666666",*/ false, false, true);
        this.x = x;
        this.y = y;
        this.dx = dx; // the direction the port opens in
        this.dy = dy; // the direction the port opens in
    }
}


// returns how much space is available to build a module
// TODO: allow for variable / configurable padding
// eg: change ceil to floor, add a +n padding distance
function measureEmpty(x,y,dx,dy,width,height,map){
    let x1 = x + dx - Math.ceil(0.5*width); // ceil: one tile padding to left
    let x2 = x + dx + Math.ceil(0.5*width); // ceil: one tile padding to right
    let y1 = y + dy;
    let j;

    // this assumes dx,dy will be 
    // +1 or -1 in one direction, 
    // and 0 in the other eg: (1,0); (0,-1)
    // TODO: this switch() system is sort of BS, 
    // should be more elegant way to write this 
    // as a more universal transformation.  cases are all similar equations..
    switch (dx){
        case 0: // top or bottom facing port
        switch (dy){
            case -1: // top facing
                for(j=y1;j>=y1-(height+1);j--){ // one tile padding to y
                    for(let i=x1;i<=x2;i++){
                        if (map.getTile(i,j).constructor.name !== "Space"){
                        //if (map.tiles[i][j].constructor.name !== "Space"){
                            return y1-j;
                        }
                    }
                }
                return y1-j;
                break;
            case 1: // bottom facing
                for(j=y1;j<=y1+height+1;j++){ // one tile padding to y
                    for(let i=x1;i<=x2;i++){
                        if (map.getTile(i,j).constructor.name !== "Space"){
                        //if (map.tiles[i][j].constructor.name !== "Space"){
                            return j-y1;
                        }
                    }
                }
                return j-y1;
                break;
            default: console.log("invalid dy value "+dy);
        }
        case -1: // left facing port
            // not sure how I'm going to transform horizontal modules, 
            // might rotate vertical modules such that height is x so they keep 
            // universal length/width paramaters
            // or might make a different horizontal module class
            return 0; // placeholder to disable horizontal module attempts
            break;
        case 1: // right facing port
            // do stuff
            return 0; // placeholder to disable horizontal module attempts
            break;
        default: console.log("invalid dx value "+dx);
    }
}



// merges a module onto the station map
// converts map tiles to walls based on module definition
function mergeModule(map,module){
    // merge the body of the module
    for(let i=module.x1;i<=module.x2;i++){
        for(let j=module.y1;j<=module.y2;j++){
            map.tiles[i][j] = new Hull(i,j);
        }
    }
}   


// TODO: move this to a utility.js
// generates a random number between a given min and max
function randomRange(min,max){
    return Math.floor(Math.random() * (max-min+1) ) + min;
}

// creates a gamemap to hold the station
// generates modules
// merges those modules onto the map
// returns the completed map
// TODO: consider changing this to a class
function generateStation(mapWidth, mapHeight){
    modules = []; // can make this local.. but may need it externally later to transform modules
    const maxModules = 5;
    const minModules = 3;
    const maxModX = 3;
    const minModX = 3;
    const maxModY = 5;
    const minModY = 3;

    // had to make station global so that new modules could check it for space
    // TODO: learn to better scope variables
    station = new GameMap(xTiles, yTiles);  // may want this to persist outside of this function, not sure

    // couldnt figure out how to pass this, had to make it global :(
    // TODO: fix
    portList = [];  //track all ports, availability, and what they are connected to

    for(let i=0;i<maxModules;i++){
        modules[i] = new RectModule(
            randomRange(minModX, maxModX), // random width 
            randomRange(minModY, maxModY), // random height
            // portList // dont need this because I made it global
        );
        mergeModule(station,modules[i]);
    }
    // merge the connection ports
    // some kludgey shit, TODO: cleanup
    for(let i=0;i<maxModules;i++){
        for(let j=0;j<modules[i].ports.length;j++){
            station.tiles[modules[i].ports[j].x][modules[i].ports[j].y] = modules[i].ports[j];
            // TODO: need to place hull between modules at connected connection ports
            // TODO: need to change disconnected ports to docking ports    
        }
    }

    return station;
}

