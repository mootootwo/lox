/* 
sets up canvas
handles all drawing to canvas
*/


// consider if I can move this stuff out of global scope
const tileSize = 16;  //tile size in pixels
const xTiles = 40; // width in default tiles
const yTiles = 40; // height in default tiles

var fontName = "Wyse700b"; // TODO: get out of global.. shared between loadfont and setupcanvas
//var fontUrl = "fonts/Web437_Wyse700b.woff";

function renderScreen(){
    //let fontName = "Wyse700b"; // had to move to global for now
    let fontUrl = "fonts/Web437_Wyse700b.woff";
    let gameFont = new FontFace(fontName, "url("+fontUrl+")");    
    
    gameFont.load().then(function(font){
        document.fonts.add(font);
        console.log('Font loaded');
        setupCanvas();
        // this works, but i think it contains a race condition
        // draw() has dependenies on setupCanvas()
        // it should be fixed, possibly with serialization via promise?
        setInterval(draw,500); // redraw screen every 16ms 
        
    });

}

function setupCanvas(){
    // does canvas and ctx need to be a global definition?
    // or can i scope them to something more specific?
    // used by drawing functions, how to expose them if scoped locally?
    canvas = document.createElement("canvas"); // dynamically create a canvas

    ctx = canvas.getContext("2d");

    canvas.width = ((tileSize)*(xTiles));
    canvas.height = ((tileSize)*(yTiles));
    canvas.style.width = canvas.width+"px";
    canvas.style.height = canvas.height+"px";
    canvas.style.outline = "1px solid #ffffff";
    canvas.style.backgroundColor = "#000000";

    // center canvas on the page
    canvas.style.position = "absolute"; 
    canvas.style.left = "50%"; 
    canvas.style.top = "50%"; 
    canvas.style.transform = "translate(-50%, -50%)";

 

    document.body.appendChild(canvas); // add dynamically created canvas to the html document

    ctx.font = tileSize +"px "+fontName;
    ctx.textBaseline = "top";
    ctx.imageSmoothingEnabled = false;
}

function drawChar(char,textColor,x,y){
    ctx.fillStyle = textColor; //hex code for text color
    ctx.fillText(
        char, 
        x*tileSize,
        y*tileSize
    );

}

// there is a jitter between frames when rendered in chrome
// not sure what causes this, only visible when screen clearRect() is disabled
// TODO: troubleshoot and fix
// did not exist on my previous implementations of this
function draw(){

    let playerX = Math.floor(xTiles/2);
    let playerY = Math.floor(yTiles/2);

    ctx.clearRect(0,0,canvas.width,canvas.height); //clear screen each frame
    drawChar("@","#ffffff",playerX,playerY);
    


}

