/* 
controls game state
as of part-1:
loading - running - killed
^^it actually does not do this. this is a TODO item

this also seems to be the main entrypoint
even though JS isnt supposed to need one of those.. 
I couldn't figure out how to do it otherwise.
*/

// randomly generates a non-neutral colour, with "large" difference between RGB
function paint(){
    let r = randomRange(0,255);
    let g = randomRange(0,255);
    let b = randomRange(0,255);

    if (Math.abs(((r+g)/2)-b)<50 || Math.abs(((g+b)/2)-r)<50){   // this is a really shit standard deviation calc
         return paint()
    }else return "rgba("+r+","+g+","+b+","+1+")";  // maybe I should make concatRGBA() global to use here
}


// should this be a self-initiating function?
function game(){
    // map dimensions separate from screen dimensions
    // allows scrolling over maps larger than screen
    xTiles = 40;
    yTiles = 40;

    //let playerX = Math.floor(xTiles/2);
    //let playerY = Math.floor(yTiles/2);



    npc = [];

    gameMap = generateStation(xTiles,yTiles);


    let playerStart = gameMap.getRandomClearTile();
    player = new Actor(playerStart.x, playerStart.y, "@", 255,255,255,1,/*"#ffffff",*/ false);
    player.updateFOV();
    gameMap.entities.push(player);

    engine = new Engine();

    async function render() {           // chained async.. seems like bullshit
        await setupCanvas();            // this loads font, sets up canvas and contex.  async function
        setInterval(engine.render,16);  // update screen every 16ms
    };
    render();                           // call async function set

    engine.events();  // event listener
    
}


game();
