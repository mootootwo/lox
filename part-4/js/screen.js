/* 
sets up canvas
handles all drawing to canvas

there is a whole lot of cruft in here
I was grasping at a lot of straws trying to 
disable Chrome's text-on-canvas anti-aliasing
to no avail.  
but some of it seemed like best practices worth keeping
*/


// consider if I can move this stuff out of global scope
const tileSize = 16;  //tile size in pixels
const xScreen = 40; // width in default tiles
const yScreen = 40; // height in default tiles

var fontName = "Wyse700b"; // TODO: get out of global.. shared between renderScreen() and setupCanvas()
//var fontUrl = "fonts/Web437_Wyse700b.woff";

async function setupScreen(){  
    //let fontName = "Wyse700b"; // had to move to global for now
    let fontUrl = "fonts/Web437_Wyse700b.woff";
    let gameFont = new FontFace(fontName, "url("+fontUrl+")");    
    
    gameFont.load().then(function(font){ // TODO: review / fix chained promises
        document.fonts.add(font);
        console.log('Font loaded');
        setupCanvas();
    });
    return;                             // this is needed for the async function
}

function setupCanvas(){
    // does canvas and ctx need to be a global definition?
    // or can i scope them to something more specific?
    // used by drawing functions, how to expose them if scoped locally?
    canvas = document.createElement("canvas"); // dynamically create a canvas

    ctx = canvas.getContext("2d");
    let scale = window.devicePixelRatio; // scaling to devicePixelRation should improve crispness
    
    canvas.width = Math.floor((tileSize)*(xScreen)*scale);
    canvas.height = Math.floor((tileSize)*(yScreen)*scale);
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
    ctx.scale(scale, scale); // Normalize coordinate system to use CSS pixels. WTF ever that means.
    //ctx.translate(0.5,0.5); // improve anti-aliasing blur by shifting rendering by half pixel
}

function drawChar(char,textColor,x,y){
    ctx.fillStyle = textColor; //hex code for text color
    ctx.fillText(
        char, 
        x*tileSize,
        y*tileSize
    );
}
