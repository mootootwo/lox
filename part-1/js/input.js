/* 
Handles all player input

as of part-1:
orthagonal movement, exit
*/


// listens for input
// generates a new action object based on a class template
// returns that object to whatever called the input listener
function listenInput(){
    let action = null;
    document.querySelector("html").onkeydown = function(e){
        // handles orthagonal movement and returns dx,dy
        if(e.key=="w") new MoveAction(0, -1);
        if(e.key=="s") new MoveAction(0, 1);
        if(e.key=="a") new MoveAction(-1, 0);
        if(e.key=="d") new MoveAction(1, 0);

        // listens for an escape and does nothing yet
        if(e.key==="Escape") EscapeAction();
    };
    return action;
}