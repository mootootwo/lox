/* 
Handles all player input

as of part-1:
orthagonal movement, exit
*/


// straight from nluqo needs rewrite
// does not work without rewrite
// get the state changes out of here
// should not trigger game start and title with the input setup
function listenInput(){

    document.querySelector("html").onkeydown = function(e){
        if(gameState == "title"){                              
          startGame();                
        }else if(gameState == "dead"){                             
          showTitle();                                        
        }else if(gameState == "running"){ 
          if(e.key=="w") player.move(0, -1);
          if(e.key=="s") player.move(0, 1);
          if(e.key=="a") player.move(-1, 0);
          if(e.key=="d") player.move(1, 0);
          if(e.key==="Escape") gameKill();
        }
      };

}