/* 
sets up canvas
handles all drawing to canvas
*/


// consider if I can move this stuff out of global scope
const tileSize = 16;  //tile size in pixels
const xTiles = 10; // width in default tiles
const yTiles = 10; // height in default tiles

function loadFont(fontName, fontUrl){
    let gameFont = new FontFace(fontName, "url("+fontUrl+")");

    gameFont.load().then(function(font){ //preloads custom font before drawing canvas
        document.fonts.add(font);
        console.log('Font loaded');
    
        draw();
      
    });
}

function setupCanvas(){
    let fontName = "Wyse700b";
    let fontUrl = "fonts/Web437_Wyse700b.woff";    

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

    // center our canvas on the page
    canvas.style.position = "absolute"; 
    canvas.style.left = "50%"; 
    canvas.style.top = "50%"; 
    canvas.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(canvas); // add our dynamically created canvas to the html document

    ctx.font = tileSize +"px "+fontName;
    ctx.textBaseline = "top";

    loadFont(fontName, fontUrl);

}

function drawChar(char,textColor,x,y){
    ctx.fillStyle = textColor; //hex code for text color
    ctx.fillText(
        char, 
        x*tileSize,
        y*tileSize
    );

}

function draw(){

    //setTimeout(() => { drawChar("0123456789","#ffffff",0,0); }, 500);
    for (let i=0; i<10; i++){
        drawChar(i,"#ffffff",0,i)
        for (let j=1; j<10; j++){
            drawChar("\u253c","#ffffff",j,i)
        }
    }


}

