# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-4
Part-3 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-4/) .  Filed of View.

### NOT DONE
- entites should be visible or invisible
- entities should be lit or not lit
- tiles should be explored or not explored
- tutorial treats tiles and entities separatly.  I could unify this, but I sill render the map separatly from other entities

- tutorial tracks visible and explored in unique arrays
- i dont love this, not sure if I will do it.  we'll see when we get there.

- tutorial stores lit and unlit characters/colours.  I may not do this, may use an alpha layer on top or may colour shift unlit characters

- will need to add a colour function to be able to tweak RGBA values

###
tried to draw a shader tile over regualr tiles to manage visibility, but sub-pixel antialiasing makes the underlaying tiles leak at the edges.  invisible tiles are drawn with ghost outlines, and partially visible tiles are drawn with brighter stripes along the edges.

need to adjust the brightness of the tile, so modify the tile draw() function

## [Demo](https://mootootwo.github.io/lox/part-4/)