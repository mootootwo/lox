/*
utilities
*/


function distance(x1,y1,x2,y2){ // returns distance between two points.. rounded
    return Math.round(Math.sqrt(((x2-x1)**2)+((y2-y1)**2))) // distance formula
}


// generates a random number between a given min and max
function randomRange(min,max){
    return Math.floor(Math.random() * (max-min+1) ) + min;
}