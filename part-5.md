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

### Stuff
-x move entites so they are stored on the map class
- move entity rendering loop (not entity.draw()) to map class
- test if entity is on a visible tile before drawing
-x make sure that player is passed into entities list
-x create a place for NPCs to spawn (this will be docking ports)
-- add function to get random unblocked docking port
--x add function to get random free tile (for player placement)
-x add blocksMovement ability to NPCs (not needed because entites already include "passable" since entities include tiles)
- add name to NPCs? (tabling this for later)
- don't know WTF tcod factories do.  hopefully not important.
- update movement to check if the space being moved to is blocked
-- tutorial suggests changing movement action to action with direction
--- movement and bumping would be different actions as children of the directional action
-- identify bumping of NPCs and trigger something
-- want to also identify bumping of walls.  tutorial does this with a bump action that determines if we have a wall bump or a melee bump.
- add something into the engine for the game loop to include NPC turns (lol)





- want to have ticks and spawn NPCs every n ticks
-x want to colorize NPCs randomly
- want to assign different movement algorithms to NPCs 






## [Demo](https://mootootwo.github.io/lox/part-5/)