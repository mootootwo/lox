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
The Python tutorial runs the program only while called in a specific way and exits it cleanly when the window is closed.  I could have chosen to allow the nature of browser based JIT execution to handle this natively, but I chose to implement a rudimentary game loop.

This also gave me a place to handle the loading of external assets (such as the font I am using).  Asynchronous requests had been causing me particular difficulty and I still need to improve how I handle them.

### Draw Character
I changed my little grid test-pattern to be the familiar `@` character and centered it on the canvas

### Handle Input
My input handler is lifted directly from my attempt at Jeremiah Reid's excellent [Broughlike](https://nluqo.github.io/broughlike-tutorial/index.html) tutorial.

I specifically used an early version of it that fit in with this part of the tutorial.

#### Define Actions
For this tutorial, the above input handling is powering actions that are defined as classes.  I'm not sure that this is the correct structural element for this language or what programming paradigm it represents, but I give it a go.

tcod includes an event class, and I am tempted to implement something similar.  JS has a native concept of event listeners though, and I'm not sure that it adds any value to duplicate that.

#### Move Character


#### End Game Loop
This is an implicit part of the Python tutorial, and I could have allowed JS to handle it implicitly as well

### Add Screen Refresh