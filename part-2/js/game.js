/* 
controls game state
as of part-1:
loading - running - killed

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

    // stuck these in the global scope
    // so i could manipulate them with moveAction()
    // TODO: learn how to do it better
    playerX = Math.floor(xTiles/2);
    playerY = Math.floor(yTiles/2);

    // engine wont work if these are locally scoped
    player = new Actor(playerX, playerY, "@", "#ffffff", false);
    npc = new Actor(playerX+5, playerY, "&", "#ff00ff", false);
    entities = [player, npc];
    gameMap = new GameMap(xTiles, yTiles);
    engine = new Engine(entities);
    
    async function render() { 
        await setupScreen();            // this loads font, sets up canvas and contex.  async function
        setInterval(engine.render,16);  // update screen every 16ms
    };
    render();                           // call async function set
    
    engine.events();
    
}


game();
