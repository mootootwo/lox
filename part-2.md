# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-2
Part-2 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-2/) creates a generic Entity, a render function, and the map.

### Entity class
Per the tutorial: player and npc should be a subclass of the generic Entity

It seems reasonable though to make Actor a subclass of Entity, and construct Player and NPC from Actor.  Not all entities will need movement or the ability to act.  Some entites might be items that dont move.  I'm also not entirely sure why walls and floors do not descend from the generic Entity, so I will make them do exactly that.

The tutorial also has us list all of the entities as a set.  I used an array instead of an object as they requested, and this has the problem that it does not inforce uniqueness but I couldn't make it work the way the tutorial wanted.

I was supposed to modify movement handling to be done by the entity class, and since I didn't create Action classes previously I wasn't able to do this as instructed.  I did move the call to the event handler to the Engine, but this is a piece of growing technical debt that may need refactoring later.

I updated drawing function to use the entity object, so that every entity draws its self.  This is a bit of a divergence from the tutorial as it has the side effect of letting map tiles ane actors all draw themselves with a common function.

I was supposed to include alternate tiles and colours for different lighting conditions, but I have left this out for now as I may handle this with a slightly different approach.

### Engine class
This should draw the map and entites, and handle player input.

I fought with rendering a lot here, getting the frame drawing moved to the Engine was a problem on a few fronts:

First, the serialization was a big challenge for me and I think it might not be working right still -- possibly the first frames are being drawn before the canvas and context are fully prepared.  

Second, for a long time it was only drawing one frame and I 1) struggled to notice as I thought my movement function was just updating the wrong object and 2) struggled to fix it, and it turned out to be an unneeded () in my callback.

The Engine also has a lot of problems with things it creates being placed in the global scope, instead of scopped to something more local and passed to the other classes or functions that need them.  It tends to break when I try to do that, so it will be something to try to refactor later.

### Map class
Stores tiles that will be rendered to the screen.  I had a lot of trouble with this but it turned out that "map" is a reserved keyword for a constructor in JS.  Everything sorted out when I changed it to gameMap.

Instead of statically coding a small wall in the middle of the map, I added a simple function to generate 10% random noise and stipple the map with scattered walls.

### Tile class
Rather than creating these as a top level Class, I have extended these from the generic Entity as they shared all of the same features.

### Action classes
I still don't understand how these are working and I'm afraid leaving my kludge in place is continuing to build up technical debt that will return to bite me later.

I've left all input handling in my listenInput() function and am performing reachability tests in the actors' move() instead of in the engine or in the (non-existant) action class.

## [Demo](https://mootootwo.github.io/lox/part-2/)