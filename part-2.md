# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-2
Part-2 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-2/) creates a generic Entity, a render function, and the map.

### Entity class
by tutorial: player and npc as subclass

It seems reasonable though to make Actor a subclass of Entity, and construct Player and NPC from Actor.  Not all entities will need movement or the ability to act.  Some entites might be items that dont move.  I'm also not entirely sure why walls and floors do not descend from the generic Entity, so I will make them do exactly that.

by tutorial: list all entities in a set.  I don't yet see why, so I'm leaving this alone for now.

modify movement handling to be done by the entity class

update drawing function to use new player object

### Engine class
draws map and entites, handles player input. move rendering into engine.

### Map class
stores tiles that will be rendered to the screen

### Tile class

