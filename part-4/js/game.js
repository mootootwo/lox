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

    // stuck these in the global scope
    // so i could manipulate them with moveAction()
    // TODO: learn how to do it better
    playerX = Math.floor(xTiles/2);
    playerY = Math.floor(yTiles/2);

    // engine wont work if these are locally scoped
    player = new Actor(playerX, playerY, "@", 255,255,255,1,/*"#ffffff",*/ false);
    npc = new Actor(playerX+5, playerY, "&", 255,0,255,1,/*"#ff00ff",*/ false);
    entities = [player, npc];
    //gameMap = new GameMap(xTiles, yTiles);
    gameMap = generateStation(xTiles,yTiles);
    engine = new Engine(entities);
    
    
    renderScreen(); // this loads font, sets up canvas and contex
    setInterval(engine.render,16);
    engine.events();
    
}


game();
