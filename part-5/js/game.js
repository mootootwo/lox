/* 
controls game state
as of part-1:
loading - running - killed
^^it actually does not do this. this is a TODO item

this also seems to be the main entrypoint
even though JS isnt supposed to need one of those.. 
I couldn't figure out how to do it otherwise.
*/






// should this be a self-initiating function?
function game(){
    // map dimensions separate from screen dimensions
    // allows scrolling over maps larger than screen
    xTiles = 40;
    yTiles = 40;

    //let playerX = Math.floor(xTiles/2);
    //let playerY = Math.floor(yTiles/2);

    //gameMap = new GameMap(xTiles, yTiles);
    gameMap = generateStation(xTiles,yTiles);

    // engine wont work if these are locally scoped
    let playerStart = gameMap.getRandomClearTile();
    player = new Actor(playerStart.x, playerStart.y, "@", 255,255,255,1,/*"#ffffff",*/ false);
    player.updateFOV();
    npc = new Actor(player.x+5, player.y+5, "&", 255,0,255,1,/*"#ff00ff",*/ false);
    entities = [player, npc];

    engine = new Engine(entities);

    async function render() {           // chained async.. seems like bullshit
        await setupCanvas();            // this loads font, sets up canvas and contex.  async function
        setInterval(engine.render,16);  // update screen every 16ms
    };
    render();                           // call async function set

    engine.events();  // event listener
    
}


game();
