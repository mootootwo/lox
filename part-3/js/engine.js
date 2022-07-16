/* 
draws the map and all entites
handles player input
maybe this is more of a game client than an engine?
*/

class Engine {
    // tutorial wants this constructer
    // to receive event classes
    // havent figured that out

    // entities[] is globally scoped 
    // so doesnt strictly need to be passed here
    // but should be fixed to be locally scoped
    // that isnt working however
    // similarly gameMap[] should be passed to this
    constructor(entities){
        this.entities = entities;
	}

    // not totally convinced moving this out of 
    // draw() from screen.js is a good idea
    async render(){
        ctx.clearRect(0,0,canvas.width,canvas.height); // clear screen each frame
        gameMap.draw();
        for (let i = 0; i < this.entities.length; i++){ // draws each entity
            this.entities[i].draw();
        }
    }

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