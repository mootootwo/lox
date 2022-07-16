# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no third party libraries

##  Part-4
Part-3 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-4/) .  Filed of View.

### More Divergence
The tutorial specifies Explored and Visible as seperate things to track, and uses differnt tiles to draw each condition.  Instead I am only handling Visibility and doing it with a semi-transparent shader layer instead of changing the tile or color.

I still have two arrays handle this, beyond the main map array of tiles.  I think this can probably be consolidated down to a single array, but will leave that alone for now.

### Shading
Tried to draw a shader tile over regualr tiles to manage visibility, but sub-pixel anti-aliasing makes the underlaying tiles leak at the edges.  Tiles that should be hidden are drawn with ghost outlines, and partially visible tiles are drawn with brighter stripes along the edges.

I should have noticed it earlier, but I had been using gradiant tile `▒` for my walls and it hid the anti-aliasing overlap that I would have seen more quickly with a solid block like `█`

I was finally able to get a passable work around by drawing a tile-sized rectangle with a variable alpha layer over the displayed characters.

### Field of view
Somehow I thought field of view calculations would be simple.  I could imagine a few solutions for raycasting and didn't quite appreciate how tricky it would be to implement.  I found a great example of recursive shadowcasting, but didn't really understand it at all.

Finally, I lucked upon Bob Nystrom's [article](https://journal.stuffwithstuff.com/2015/09/07/what-the-hero-sees/) that explained how to do it in terms that even I could understand.

I still don't quite grasp why the examples are in octants rather than quadrants, so I've implemented a quadrant version of Bob's solution except without recursion and without shadowcasting, haha.  I am updating a shader layer as I radiate outward though, so I hope that actual shadow casting can be added later without too much fuss.

Some future things I want to play with here is adding a fall-off gradiant to the shader, and obviously adding actual shadow casting to block LOS from obstructions.

### Game loop still not done
This is where not previously having a game loop has really bit me.

I need to update my field of view after player movement, not on each screen draw.  I am still having a bit of a hard time with this, so I've cheated again and put in something expediant.

I'm calculating FOV updates with each movement input, instead of in any kind of during any kind of discrete tick processing.  I'm pretty sure I can keep doing this when it comes time to handle bumping of other entities, but it seems super sloppy and I'm not pleased with it.

### Actors
I'm not doing any visibility tests for actors such as `player` or `npc` at the moment, but will need to add that in the future.


## [Demo](https://mootootwo.github.io/lox/part-4/)