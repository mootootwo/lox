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

### Shading
tried to draw a shader tile over regualr tiles to manage visibility, but sub-pixel anti-aliasing makes the underlaying tiles leak at the edges.  Tiles that should be hidden are drawn with ghost outlines, and partially visible tiles are drawn with brighter stripes along the edges.

I should have noticed it earlier, but I had been using gradiant tile `▒` for my walls and it hid the anti-aliasing overlap that I would have seen more quickly with a solid block like `█`

I was finally able to get a passable work around by drawing a tile-sized rectangle with a variable alpha layer over the displayed characters.

### Field of view
Somehow I thought field of view calculations would be simple.  I could imagine a few solutions for raycasting and didn't quite appreciate how tricky it would be to implement.  I found a great example of recursive shadowcasting, but didn't really understand it at all.

Finally, I lucked upon Bob Nystrom's [article](https://journal.stuffwithstuff.com/2015/09/07/what-the-hero-sees/) that explained how to do it in terms that even I could understand.

I haven't implemented it yet, but I'm throwing it on the backlog of stuff to get back to.

### Game loop still not done
This is where not previously having a game loop has really bit me.

I need to update my field of view after player movement, not on each screen draw.  I am still having a bit of a hard time with this, so I've cheated again and put in something expediant.

I'm calculating FOV updates with each movement input, instead of in any kind of during any kind of discrete tick processing.  I'm pretty sure I can keep doing this when it comes time to handle bumping of other entities, but it seems super sloppy and I'm not pleased with it.



## [Demo](https://mootootwo.github.io/lox/part-4/)