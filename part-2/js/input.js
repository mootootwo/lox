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
        if(e.key=="w") moveAction(0, -1);
        if(e.key=="s") moveAction(0, 1);
        if(e.key=="a") moveAction(-1, 0);
        if(e.key=="d") moveAction(1, 0);

        // listens for an escape and does nothing yet
        if(e.key==="Escape") escapeAction();
    };
}