# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no dependencies

##  Part-2
Part-2 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-2/) creates a generic Entity, a render function, and the map.

### Entity class
by tutorial: player and npc as subclass

seems reasonable though to make Actor a subclass of Entity, and construct Player and NPC from Actor.  Not all entities will need movement or the ability to act.

by tutorial: list all entities in a set

modify movement handling to be done by the entity class

update drawing function to use new player object

### Engine class
draws map and entites, handles player input. move rendering into engine.

### Map class
stores tiles that will be rendered to the screen

### Tile class

