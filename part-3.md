# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-3
Part-3 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-3/) .Generating a dungeion

### Divergence
I'm going to start diverging a bit from the tutorial at this point.  Instead of carving out hollow rooms from an otherwise solid map, I'm turning it a bit inside out and making some interconnected solid rectangles on an otherwise hollow map.  

I tried to keep to similar topics that the tutorial covered, but added some complex problems for myself and 

### My Generator
This is the start of what I hope will become a little space station generator.  It should create modules as little rectangles the same way the tutorial generator creates rectangular rooms.

Like the tutorial, it keeps a running list of modules. It still checks for enough non-overlapping space before placing a module down.  Additionally, it adds ports to the modules where they may connect to other modules, and keeps a running list of these ports.

I think I can improve this somewhat by adding a graph data structure where I track all the connection ports and what they are connected to, or perhaps track the modules and what they are connected to; I haven't quite decided on the correct approach yet.

### Still To Do
There are a few hard-coded things that I put hastily and have not had time to fix yet.  Among them: 
- The generator does not handle modules well that are not 3 tiles wide.  
- When getting too close to the map edge, it will correctly truncate a module.  But it will not successfully place the next module at the other end of the station
- I have some embarassing case-selectors that make assumptions about the orientation of modules based on array index and this will not scale.

I will need to add a way to place horizontal modules (connected at right angles instead of in a line) and I have some of the foundation in place to handle this, but some of the hard coded placeholders above will need to be removed with dynamic systems before it is possible.

I have some gaps between connected modules that I need to fill in with walls after generation is complete.

Unused connection ports need to be replaced with docking ports after the station generation is done, so that there are ways into and out of the station.

And obviously I want to build some more interesting and diverse types of station modules, but I think I won't do that during the tutorial.

## [Demo](https://mootootwo.github.io/lox/part-3/)