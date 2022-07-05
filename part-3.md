# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-3
Part-3 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-3/) .Generating a dungeion

### Divergence
I'm going to start diverging a bit from the tutorial at this point.  Instead of carving out hollow rooms from an otherwise solid map, I'm turning it a bit inside out and making some interconnected solid rectangles on an otherwise hollow map.  

For referefreence, these are the topics the tutorial walks through.  I'll be working on similar analogues to each:

- Rooms
- Slices - slices the array to get an inner portion within the perimiter walls
these pad rooms with a double thick wall so that adjacent rooms don't merge
- center "property"
- Tunnels
- generate_dungeon returns GameMap
- line of sight library
- yield / generator
- check for intersection
- keep running list of rooms
- min/max room size


### Generator
list of rooms
mix/max number of rooms
min/max size of rooms
intersection testing
connections?  

#### Rectangular module
wrote a simple class to generate a rectangle.  

#### Merge modules to map
Moved the map generation to a local variable in the generator, and wrote a function to merge any rectangular modules into the map.  The generator then returns the completed map and it gets rendered as in part-2.


#### Next thing..