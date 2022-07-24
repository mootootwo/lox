# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-5
Part-5 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-5/) .  Placing and Bumping Actors

### Station generation improvement
I needed to fix up some problems with station generation.  I took the opportunity to make the free-space measurements more robust, and also fixed some errors in module placement.  There are still some edge cases with problems that I can't quite figure out, ignoring them for now.

The end result of this is that all the modules are linked together, and there are a variety of docking ports around the station.  I still don't have modules attached at right angles, but maybe that is an enhancement for a later week.

Now that I have these docking ports around the station, they can serve as places from which to spawn NPCs, which is what part-5 is all about.

### NPCs
I wanted to get some NPCs spawinging and I was in a bit of a hurry.  So, instead of reading the tutorial I just turned my npc into an array `npc[]` and placed one at the opening of each docking port, which I might have as many as 12 of at the moment (depending on how the station generates).

I used the Phi character `Φ` because it's low-res representation looks like a little tie-fighter and I thought it was a decent space ship.  I think I originally saw that idea on some ancient DOS game.  I also wrote the worlds worst Standard Deviation algorithm to give each one a random vivid (not greyish) paint job.  I'm much more proud of this than I have any right to be.

### Entity Updates
As the tutorial suggested, I managed to move these into the GameMap class and things seem to be good in that regard.

Instead of assigning a name to them when they are constructed, I allowed Entities to inherit their constructor name for now.  It will be simple to extend this to support custom names, but this works.

I did not need to add a `blocksMovement` type property to Actors, since they already share a class with Tiles and they already have the `passable` property.

### Movement
I am not happy with cycling through the entity list looking for impassable entities, but I followed that part of the tutorial and implemented it.

It seems sloppy, and I can imagine that I might have multiple blocking entites per tile in some edge cases.  I'm over my time budget for this week though, so I've just noted it down as something to do better next time.

### Misc stuff
A bunch of things I didn't do that I wanted to:
- move entity rendering loop (not entity.draw()) to map class
- test if entity is on a visible tile before drawing
- add function to get random unblocked docking port
- tutorial suggests changing movement action to action with direction
-- movement and bumping would be different actions as children of the directional action
-- want to also identify bumping of walls.  tutorial does this with a bump action that determines if we have a wall bump or a melee bump.
- add something into the engine for the game loop to include NPC turns (lol)
- want to have ticks and spawn NPCs every n ticks
- want to assign different movement algorithms to NPCs 

## [Demo](https://mootootwo.github.io/lox/part-5/)