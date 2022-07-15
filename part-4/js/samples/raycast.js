/*____  _               _   _           _       _
 / ___|| | _____      _| | | | __ _  __| | ___ | | _____ _ __
 \___ \| |/ _ \ \ /\ / / |_| |/ _` |/ _` |/ _ \| |/ / _ \ '_ \
  ___) | | (_) \ V  V /|  _  | (_| | (_| | (_) |   <  __/ | | |
 |____/|_|\___/ \_/\_/ |_| |_|\__,_|\__,_|\___/|_|\_\___|_| |_|  */

// built using examples provided by Daniel Shiffman.

let canvas = document.getElementById("raycastingCanvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width = 500;
let canvasHeight = canvas.height = 300;
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;

let mouse = {
  x: 0,
  y: 0
};

let mouseMove = function(event) {
  mouse.x = event.pageX - offsetX;
  mouse.y = event.pageY - offsetY;
};

canvas.addEventListener('mousemove', mouseMove);

// helper functions
let degreeToRadian = function(degree) {
  return (degree / 180) * Math.PI;
};

// vector object
let Vector = function(x,y) {
  this.x = x;
  this.y = y;
};

// static vector object methods
Vector.fromAngle = function(angle, v) {
  if (v === undefined || v === null) {
    v = new Vector();
  }
  v.x = Math.cos(angle);
  v.y = Math.sin(angle);
  return v;
};

Vector.dist = function(v1, v2) {
  let dx = v1.x - v2.x,
      dy = v1.y - v2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// vector object instance methods
Vector.prototype.mag = function() {
  let x = this.x,
      y = this.y,
      z = this.z;
  return Math.sqrt(x * x + y * y + z * z);
};

Vector.prototype.div = function(v) {
  if (typeof v === 'number') {
    this.x /= v;
    this.y /= v;
    this.z /= v;
  } else {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
  }
};

Vector.prototype.normalize = function() {
  let m = this.mag();
  if (m > 0) {
    this.div(m);
  }
};

// boundary object a: vector, b: vector
let Boundary = function(aVec, bVec) {
  this.a = aVec;
  this.b = bVec;
};

Boundary.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(this.a.x, this.a.y);
  ctx.lineTo(this.b.x, this.b.y);
  ctx.strokeStyle = "rgba(255, 255, 255, 1)";
  ctx.stroke();
};

// ray object
let Ray = function(pos, angle) {
  this.pos = pos;
  this.dir = Vector.fromAngle(angle);
};

/* test line used to show position a distribution of rays
Ray.prototype.draw = function(ctx) {
  ctx.translate(this.pos.x, this.pos.y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(this.dir.x * 10, this.dir.y * 10);
  ctx.strokeStyle = "rgba(255, 255, 255, 1)";
  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}; */

Ray.prototype.cast = function(boundary) {
  const x1 = boundary.a.x;
  const y1 = boundary.a.y;
  const x2 = boundary.b.x;
  const y2 = boundary.b.y;
  
  const x3 = this.pos.x;
  const y3 = this.pos.y;
  const x4 = this.pos.x + this.dir.x;
  const y4 = this.pos.y + this.dir.y;
  
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  // if denominator is zero then the ray and boundary are parallel
  if (den === 0) {
    return;
  }
  
  // numerator divided by denominator
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  let u = -((x1 -x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  
  if (t > 0 && t < 1 && u > 0) {
    const pt = new Vector();
    pt.x = x1 + t * (x2 - x1);
    pt.y = y1 + t * (y2 - y1);
    return pt;
  } else {
    return;
  }
};

// particle object
let Particle = function(pos, divisor) {
  this.pos = pos;
  this.rays = [];
  this.divisor =  divisor || 10; // the degree of approximation
  for (let a = 0; a < 360; a += this.divisor) {
    this.rays.push(new Ray(this.pos, degreeToRadian(a)));
  }
};

Particle.prototype.update = function(x, y) {
  this.pos.x = x;
  this.pos.y = y;
};

Particle.prototype.look = function(ctx, walls) {
  for (let i = 0; i < this.rays.length; i++) {
    
    let pt;
    let closest = null;
    let record = Infinity;
    
    for (let j = 0; j < walls.length; j++) {
    
      pt = this.rays[i].cast(walls[j]);
      
      if (pt) {
        const dist = Vector.dist(this.pos, pt);
        if (dist < record) {
          record = dist;
          closest = pt;
        }
      }
    }
    
    if (closest) {
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(closest.x, closest.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();
    }
  }
};

Particle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.stroke();
  /* test line to show all rays
  for (let i = 0; i < this.rays.length; i++) {
    this.rays[i].draw(ctx);
  }*/
};

// test code
let walls = [];

let wall = new Boundary(new Vector(375, 250), new Vector(375,50));
walls.push(wall);
let wall2 = new Boundary(new Vector(100, 100), new Vector(250, 250));
walls.push(wall2);
let wall3 = new Boundary(new Vector(50, 100), new Vector(250, 100));
walls.push(wall3);
let wall4 = new Boundary(new Vector(50, 50), new Vector(250, 50));
walls.push(wall4);

let particle = new Particle(new Vector(200, 200), 1);

// main loop
let main = function() {

  context.clearRect(0,0,canvasWidth,canvasHeight);
  
  context.fillStyle = "black";
  context.fillRect(0,0,canvasWidth,canvasHeight);
  
  for (let i = 0; i < walls.length; i++) {
    walls[i].draw(context);
  }
  
  particle.update(mouse.x, mouse.y); // moves particle
  particle.draw(context);            // draws particle
  particle.look(context, walls);     // draws rays
  
  window.requestAnimationFrame(main);
};
main();