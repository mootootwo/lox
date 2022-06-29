/* 
controls game state
as of part-1:
loading - running - killed

this also seems to be the main entrypoint
even though JS isnt supposed to need one of those.. 
I couldn't figure out how to do it otherwise.
*/


// stuck these in the global scope
// so i could manipulate them with moveAction()
// TODO: learn how to do it better
playerX = Math.floor(xTiles/2);
playerY = Math.floor(yTiles/2);

// should this be a self-initiating function?
function game(){
    /*
    moved some serialization into renderScreen()
    need to add game state control here
    */
    renderScreen();
    listenInput();
}


game();
