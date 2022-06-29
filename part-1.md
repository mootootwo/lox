# r/roguelikedev Roguelike Tutorial 2022
LOX
Native Javascript, no dependencies

##  Part-1
Part-1 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-1/) sets up the screen, draws to it, builds a basic game loop, and handles input.

### Completed Prior
Screen setup and basic drawing were done in [Part-0](https://mootootwo.github.io/lox/part-0).  This was necessary to validate that the imported font was rendering correctly, and was done as part of the dependency setup.

Instead of `Hello World` we have a simple test pattern that validates our font size and canvas configuration.

Some basic serialized loading functions were setup during this part to allow the screen drawing to being after the font finishes loading.

### Create Game Loop
The Python tutorial runs the program only while called in a specific way and exits it cleanly when the window is closed.

I think there are opportunities to create a sort of game loop with loading and ending screens, but the nature of JS JIT execution means 

### Draw Character
I changed my little grid test-pattern to be the familiar `@` character and centered it on the canvas

### Handle Input
My input handler is lifted directly from my attempt at Jeremiah Reid's excellent [Broughlike](https://nluqo.github.io/broughlike-tutorial/index.html) tutorial.

I specifically used an early version of it that fit in with this part of the tutorial.

The tutorial specifies a different method of doing this, where the event listener is created as a class, but I couldn't figure out how that worked.

#### Define Actions
For this tutorial, the above input handling is powering actions that are defined as classes.  I'm not sure that this is the correct structural element for this language or what programming paradigm it represents. I also couldn't figure out how to make it work.

Instead of classes, I set up the actions as functions and called them from the input events.

#### Move Character
Shamefully, I put my player coordinates into the global scope so that they could be easily manipulated by the action functions.  There is probably a better way of doing this.

#### End Game Loop
This is a part of the Python tutorial that happens when you close the python window, but 

### Add Screen Refresh
Simple interval timer on screen redraw