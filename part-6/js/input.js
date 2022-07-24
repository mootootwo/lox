/* 
Handles all player input

as of part-1:
orthagonal movement, exit
*/


// listens for input, calls a function based on the input
// tutorial instucted it to create an object of an Action class type
// I couldnt figure that out.  Was supposed to:
// generates a new action object based on a class template
// returns that object to whatever called the input listener
function listenInput(){
    document.querySelector("html").onkeydown = function(e){
        // handles orthagonal movement and returns dx,dy
        if(e.key=="w") {
            player.char = "\u25b2";
            moveAction(0, -1);
        };
        if(e.key=="s") {
            player.char = "\u25bc";
            moveAction(0, 1);
        };
        if(e.key=="a") {
            player.char = "\u25c4";
            moveAction(-1, 0);
        };
        if(e.key=="d") {
            player.char = "\u25ba";
            moveAction(1, 0);
        };

        // listens for an escape and does nothing yet
        if(e.key==="Escape") escapeAction();
    };
}