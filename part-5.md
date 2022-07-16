# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-5
Part-5 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-5/) .  Placing and Bumping Actors

### Stuff
- move entites so they are stored on the map class
- move entity rendering loop (not entity.draw()) to map class
- test if entity is on a visible tile before drawing
- make sure that player is passed into entities list
- create a place for NPCs to spawn (this will be docking ports)
-- add function to get random unblocked docking port
-- add function to get random free tile (for player placement)
- add blocksMovement ability to NPCs
- add name to NPCs?
- don't know WTF tcod factories do.  hopefully not important.
- update movement to check if the space being moved to is blocked
-- tutorial suggests changing movement action to action with direction
--- movement and bumping would be different actions as children of the directional action
-- identify bumping of NPCs and trigger something
-- want to also identify bumping of walls.  tutorial does this with a bump action that determines if we have a wall bump or a melee bump.
- add something into the engine for the game loop to include NPC turns (lol)





- want to have ticks and spawn NPCs every n ticks
- want to colorize NPCs randomly
- want to assign different movement algorithms to NPCs 






## [Demo](https://mootootwo.github.io/lox/part-5/)