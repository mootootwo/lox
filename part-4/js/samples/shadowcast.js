/*
Recusrive Shadow Casting by _Hey, JavaScript_

stole this from https://gist.github.com/ebonneville/4200578
as described https://heyjavascript.com/field-of-view-in-javascript-using-recursive-shadow-casting/

I dont know how the fuck this works.

Implementation should look like:
    // this demo uses a class called Vector2, which can be found here: https://gist.github.com/3929297

    // create a light source at position (9, 10)
    var lightSource = new LightSource(new Vector2(9, 10), 10);

    //  move the light source to position (10, 10);
    lightSource.update(new Vector2(10, 10));
*/

// basic position class, holds x and y coordinates and utility functions
function Vector2(x, y) {
	this.x = x;
	this.y = y;
	
	this.add = function(other) {
		return new Vector2(this.x + other.x, this.y + other.y);
	};
	
	this.distance = function(pos) {
		var dx = pos.x - this.x;
		var dy = pos.y - this.y;
		
		return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
	};
	
	this.manhattan = function(pos) {
		return(Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y));
	};
	
	this.clone = function() {
		return(new Vector2(this.x, this.y));
	};
	
	this.toString = function() {
		return("(" + this.x + ", " + this.y + ")");
	};
}


// uses shadowcasting to calculate lighting at specified position
function LightSource(position, radius) {
	this.tiles = [];
	this.position = position;
	this.radius = radius;
	
	// multipliers for transforming coordinates into other octants.
	this.mult = [
					[1,  0,  0, -1, -1,  0,  0,  1],
					[0,  1, -1,  0,  0, -1,  1,  0],
					[0,  1,  1,  0,  0, -1, -1,  0],
					[1,  0,  0,  1, -1,  0,  0, -1]
				];
	
	// calculates an octant. Called by the this.calculate when calculating lighting
	this.calculateOctant = function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id) {
		map.data[cx][cy].lit = true;
		map.data[cx][cy].unseen = false;
		map.data[cx][cy].draw(this.position, radius);
		this.tiles.push(map.data[cx][cy]);
		
		var new_start = 0;	
		
		if(start < end) return;
		
		var radius_squared = radius * radius;		

		for(var i = row; i<radius+1; i++) {
			var dx = -i-1;
			var dy = -i;
			
			var blocked = false;
			
			while(dx <= 0) {

				dx += 1;
				
				var X = cx + dx * xx + dy * xy;
				var Y = cy + dx * yx + dy * yy;
				
				if(X < map.size.x && X >= 0 && Y < map.size.y && Y >=0) {
				
					var l_slope = (dx-0.5)/(dy+0.5);
					var r_slope = (dx+0.5)/(dy-0.5);
					
					if(start < r_slope) {
						continue;
					} else if( end > l_slope) {
						break;
					} else {
						if(dx*dx + dy*dy < radius_squared) {
							map.data[X][Y].lit = true;
							map.data[X][Y].unseen = false;
							map.data[X][Y].draw(this.position, radius);
							this.tiles.push(map.data[X][Y]);
						} 
						
						if(blocked) {
							if(map.data[X][Y].blocksSight) {
								new_start = r_slope;
								continue;
							} else {
								blocked = false;
								start = new_start;
							}
						} else {
							if(map.data[X][Y].blocksSight && i < radius) {
								blocked = true;
								this.calculateOctant(cx, cy, i+1, start, l_slope, radius, xx, xy, yx, yy, id+1);
								
								new_start = r_slope;
							}
						}
					}
				}
			}
			
			if(blocked) break;
		}
	}
	
	// sets flag lit to false on all tiles within radius of position specified
	this.clear = function () {
		for(var i = 0; i<this.tiles.length; i++) {
			this.tiles[i].lit = false;
			this.tiles[i].draw();
		}
		
		this.tiles = [];
	}
	
	// sets flag lit to true on all tiles within radius of position specified
	this.calculate = function () {
		this.clear();
		
		for(var i = 0; i<8; i++) {
			this.calculateOctant(this.position.x, this.position.y, 1, 1.0, 0.0, this.radius, 
				this.mult[0][i], this.mult[1][i], this.mult[2][i], this.mult[3][i], 0);
		}
		
		map.tile(this.position).lit = true;
		map.tile(this.position).unseen = false;
		map.tile(this.position).draw();
		this.tiles.push(map.tile(this.position));
	}
		
	// update the position of the light source
	this.update = function(position) {
		this.position = position;
		this.clear();
		this.calculate();
	}
}