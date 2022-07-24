# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-6
Part-6 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-6/) .  Doing and taking damage

### Stuff
- refactor 
-- move event handing out of engine
-- pass engine as a paramater to gameMap
-- pass map as paramater to entities (may not need because they have `this`)
-- actions initialized with actor who is acting
-- actions reference engine via entity->gameMap->engine

- create `Fighter` component
-- composition model includes mixins, not totally sure what the difference is
-- class BaseComponent has entity passed to it
--- has property of engine.. maps to entity->gameMap->engine
-- class Fighter has BaseComponent passed to it
-- has propetties for hp, and a hpSetter function?
-- fighter sets a min and max HP for whatever it gets added to

- create ai.js
-- has pathing and/or movement
-- tutorial uses some graph theory stuff here
-- tutorial also uses a pathfinding algorithm from the library
-- will probably do a random walk / drunken walk instead
-- ai checks for
--- is in player vision
--- is next to player (attack)
--- move towards player otherwise
-- wont do all that above.. also wont descriminate between move and attack action, boops will result from blocked moves.

- add wait action
- figure out how to handle NPC turns
-- add function to GameMap to return only actors?
-- specifically only ones that are alive
-- add function to get actors at a given location, but not used yet

- modify input system to handle multiple keys



## [Demo](https://mootootwo.github.io/lox/part-6/)