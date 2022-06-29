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
    /*
    moved some serialization into renderScreen()
    need to add game state control here
    */
    renderScreen();
    //setupCanvas();
    //draw(); 
    //setInterval(draw,16); // redraw screen every 16ms
    
    // listens for input..
    // listenInput();


    

}


// unused.  was original attempt at serialization, 
// currently replaced by loadFont()
/*
function loadGame (){
    parent.gameState = "loading";
    setupCanvas();
    // reading in external data can also go here
    parent.gameState = "loaded";


}
*/

// TODO
function gameKill(){

};


game();
