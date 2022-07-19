/* 
draws the map and all entites
handles player input
maybe this is more of a game client than an engine?
*/

class Engine {
    // tutorial wants this constructer
    // to receive event classes
    // havent figured that out

    // should gameMap[] be passed to this?
    constructor(){
	}

    // not totally convinced moving this out of 
    // draw() from screen.js is a good idea
    render(){
        ctx.clearRect(0,0,canvas.width,canvas.height); // clear screen each frame
        gameMap.draw();
        for (let i = 0; i < gameMap.entities.length; i++){ // draws each entity
            gameMap.entities[i].draw();
        }
    }

    /*
    How I want to update shading

    identify each perimiter tile
    plot slope back to origin
    follow each slope from origin out, stoping when obstacle hit

        from POV
        for each octant
        perimiter y = pov-dy; until pov; y++
        perimiter x = pov; until distance>max¦¦ x===y; x++
            for each perimiter tile
                measure slop to POV
                from pov, find each tile along slope
                stop when non-transparent tile hit
    
    OR

    from origin
    draw each octant
    when obstacle hit, plot path back to origin
    while drawing rest of octant, check against list of shadow slopes
    stop processing rows when distance reached?

        from pov
        for each octant
            y = pov; until max; y++
            x = pov; until x=y ¦¦ until distance>max; x++
            if obstacle, check slope back to pov
            check each new tile against array of slopes

    ^^ this second method is better.  keep array of slopes for each obstacle,
    dont do a ray-cast for every tile on the perimiter
    will have much less overlap of tiles near the pov
    will track many fewer slopes
    */

    // the tutorial is still expecting 
    // individual action types as classes
    // instead I've got it rolled up 
    // into the single input listener

    // tutorial wants the engine to perform 
    // reachability tests on move actions 
    // instead of in actor.move()
    events(){
        listenInput();
    }


}