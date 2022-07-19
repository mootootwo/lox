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
	constructor(width, length/*, portList*/){
        this.width = width;
        this.length = length;
        // only need to know parent port for generation, 
        // don't need to save it with the module
        // TODO: fix
        this.parentPort = this.pickParentPort(); // TODO: <-- do this without saving the object
        this.x1 = this.findX1();
        this.y1 = this.findY1();
        this.x2 = this.x1+width-1;
        this.y2 = this.y1+length-1;
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
                    this.y1=py+pdy-this.length;
                    break;
                case 1: // bottom facing port
                    this.y1=py+pdy+1;
                    break;
            }
        }else { // centers on map if no parent exists
            this.y1 = Math.floor((yTiles-this.length)/2);
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
            this.length,
            station
        )
        
        if (n<3+2){ // not enough space to place a module
                    // min lenth is 3, padding 1 on either side
                    // TODO: remove hard coded paramaters
            modules[pPort.module].ports[pPort.port] = new DockingPort( // convert to docking port
                modules[pPort.module].ports[pPort.port].x, 
                modules[pPort.module].ports[pPort.port].y, 
                modules[pPort.module].ports[pPort.port].dx, 
                modules[pPort.module].ports[pPort.port].dy 
            );
            dockList.push({                     // adds new docking port to dockList[]
                "module":pPort.module, 
                "port":pPort.port
            });
            portList.splice(i,1);           // splice connection port out of available list
            return this.pickParentPort();   // recurse and try again
    
        } else if (n<=this.length+2){       // too little space for chosen length
            this.length = n-2;              // if < length+padding, truncate length
            this.y2 = this.y1+length-1;     // update y2.. may not survive transforms??
            portList.splice(i,1);            // splice port out of available list
            return pPort;
        } else { 
            portList.splice(i,1);            // splice port out of available list
            return pPort;
        }
    }

    // not currently used
    // TODO: convert this for use finding docking port
    randomAvailablePort(){ 
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
            Math.ceil((this.x2-this.x1)/2+this.x1), // width midpoint
            //Math.ceil((this.width)/2+this.x1), // width midpoint
            this.y1, // top
            0, // direction: no change x
            -1,  // direction: up 1
            null // placeholder v value for parent link
        );
        /*
        portList.push({ // adds this port to portList
            // module.length is kludge TODO: do better
            "module":modules.length, // what module number is this part of
            "port":0, // lazy hardcoded
        });
        */
        this.ports[1] = new ConnectionPort(
            Math.ceil((this.x2-this.x1)/2+this.x1), // width midpoint
            //Math.ceil((this.width)/2+this.x1), // width midpoint
            this.y2, // bottom
            0, // direction: no change x
            1, // direction: down 1
            null // placeholder v value for parent link
        );
        /*
        portList.push({ // adds this port to portList
            // module.length is kludge TODO: do better
            "module":modules.length, // what module number is this part of
            "port":1, // lazy hardcoded
        });
        */
        
        // trying something to add connection points to the sides of some modules
        if (this.length % 2 != 0 ){
            this.ports[2] = new ConnectionPort(
                this.x1, // left
                Math.ceil((this.y2-this.y1)/2+this.y1), // length midpoint
                -1, // direction: left
                0, // direction: no change y
                null // placeholder v value for parent link
            );
            portList.push({ // adds this port to portList
                // module.length is kludge TODO: do better
                "module":modules.length, // what module number is this part of
                "port":2, // lazy hardcoded
            });
        
            this.ports[3] = new ConnectionPort(
                this.x2, // left
                Math.ceil((this.y2-this.y1)/2+this.y1), // length midpoint             
                1, // direction: right
                0, // direction: no change y
                null // placeholder v value for parent link
            );
            portList.push({ // adds this port to portList
                // module.length is kludge TODO: do better
                "module":modules.length, // what module number is this part of
                "port":3, // lazy hardcoded
            });
        
        }
        


        // update parent port to add v-value for local port
        // update local port to add v-value for parent port
        // updates list of all ports to include new unconnected ports
        // TODO: improve this:
        // this is kind of fucked.. 
        // case statement contains hard coded scenarios
        // not modular/functional
        // will not scale or extend
        // TODO:
        // updaing port list based on parent port detection is incompatable
        // with updaing port list based on port creation.. 
        // need a non-prescriptive method of doing one or the other
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
                    
                    //portList.splice(i,1);            // splice port out of available list
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
                    
                    //portList.splice(i,1);            // splice port out of available list
                    break;
            }
        }else{ // should only trigger this for first module
            for (let i=0;i<2/*this.ports.length*/;i++){  // only push 0 and 1, others are weird exceptions
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
        super(x, y, "\u2592",/*"\u2261",*/ 255,255,255,1,/*"#666666",*/ false, false, true);
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
function measureEmpty(x,y,dx,dy,width,length,map){
    let p = 1;                                  // how many tiles of padding around the module
    let x1 = x + dx - (Math.floor(0.5*width)+p); 
    let x2 = x + dx + (Math.floor(0.5*width)+p); 
    let y1 = y + dy;                            // y1 is one tile adjacent to parent connection port
    let j;


    // TODO:
    // add some sort of x/col flip for this to handle horizontal cases
    function measure(r1,c1,dr,dc){
        for (var row = 0; Math.abs(row) < length+(2*p); row=row+dr) {
            for (let col = 0; col < width+(2*p); col=col+dc) {
                if (map.getTile(c1+col,r1+row).constructor.name !== "Space"){
                    return Math.abs(row);
                }
            }
        }
        return Math.abs(row);// i feel like this shoudl have a +1 but it works this way :(
    }

    if (dx===0){                    // top or bottom facing port
        return measure(y1,x1,dy,1);       // for dy==1¦¦dy==-1

    }else{                          // right or left facing port
        return 0;                   // disable horizontal placement
        return measure(x1,y1,dx,1);       // for dx==1¦¦dx==-1
                                    // this isnt actually going to work
                                    // TODO: solve transform for horizontal modules
    };

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




// creates a gamemap to hold the station
// generates modules
// merges those modules onto the map
// returns the completed map
// TODO: consider changing this to a class
function generateStation(mapWidth, mapHeight, entities){
    modules = []; // can make this local.. but may need it externally later to transform modules
    const maxModules = 5;
    const minModules = 3;
    const maxModX = 3;
    const minModX = 3;
    const maxModY = 5;
    const minModY = 3;

    // had to make station global so that new modules could check it for space
    // TODO: learn to better scope variables
    station = new GameMap(xTiles, yTiles, entities);  // may want this to persist outside of this function, not sure
                                            // TODO: make this function local
                                            // will need to pass map to module constructor

    // couldnt figure out how to pass this, had to make it global :(
    // TODO: fix
    portList = [];  // track all connection ports, 
                    // was going to track availability and what they are connected to
                    // but availability became an implicit property of being on the list

    dockList = [];  // track all docking ports

    for(let i=0;i<maxModules;i++){
        modules[i] = new RectModule(
            randomRange(minModX, maxModX), // random width 
            randomRange(minModY, maxModY), // random length
            // portList // dont need this because I made it global
        );
        mergeModule(station,modules[i]);
    }
    
    
    // change remaining disconnected ports to docking ports
    for(let i=0;i<portList.length;){        // dont need i++ because portlist gets shorter each round
        modules[portList[i].module].ports[portList[i].port] = new DockingPort( // convert to docking port
            modules[portList[i].module].ports[portList[i].port].x, 
            modules[portList[i].module].ports[portList[i].port].y, 
            modules[portList[i].module].ports[portList[i].port].dx, 
            modules[portList[i].module].ports[portList[i].port].dy 
        );
        dockList.push({                     // adds new docking port to dockList[]
            "module":portList[i].module, 
            "port":portList[i].port
        });
        portList.splice(i,1)            // splice port out of available list
    };
    // some kludgey shit, TODO: cleanup
    // merge the connection ports
    for(let i=0;i<maxModules;i++){
        for(let j=0;j<modules[i].ports.length;j++){
            station.tiles[modules[i].ports[j].x][modules[i].ports[j].y] = modules[i].ports[j];
            // place hull between modules at connected connection ports
            if (modules[i].ports[j].constructor.name==="ConnectionPort"){
                station.tiles[modules[i].ports[j].x+modules[i].ports[j].dx]
                             [modules[i].ports[j].y+modules[i].ports[j].dy] 
                   = new Hull(modules[i].ports[j].x+modules[i].ports[j].dx,
                              modules[i].ports[j].y+modules[i].ports[j].dy);  
            }             
        }
    };

    return station;
}

