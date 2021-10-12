let pepes = [];
const numPepes = 50;
let p;
class PepeIcon {
  constructor(x = null, y = null) {
    this.icon = loadImage("PEPEFACE.png");
    this.x = x || Math.random() * 400 - 99;
    this.y = y || Math.random() * 560;
    this.w = 200;
    this.h = 200;
    this.accelX = Math.random() * 5 - 2.5;
    this.accelY = Math.random() * 5 - 2.5;
    this.color = (255, 255, 255, 127);
    this.speed = 2 + Math.random() * 10;
  }
  draw() {
    push();
    rectMode(CENTER);
    translate((this.x += this.accelX), (this.y += this.accelY));
    this.rotation = (this.accelX + this.accelY) * 0.0001;
    rotate((PI / 2) * this.rotation);
    image(this.icon, 0, 0, this.w, this.h);
    this.accelY = (mouseY / height) * this.speed - this.speed / 2;
    this.accelX = (mouseX / width) * this.speed - this.speed / 2;

    pop();
    if (this.x < 0 - this.w) {
      // it's gone off the chain
      this.x = width;
    }
    if (this.y < 0 - this.h) {
      // it's gone off the chain
      this.y = height;
    }
    if (this.y > height + this.h) {
      // it's gone off the chain
      this.y = 0 - this.h;
    }
    if (this.x > width + this.w) {
      // it's gone off the chain
      this.x = 0 - this.w;
    }
  }
}

let bg;
function preload() {
  console.log("Hello");
  for (let i = 0; i < numPepes; i++) {
    pepes.push(new PepeIcon());
  }
  console.log(pepes);
}
function setup() {
  createCanvas(400, 560);
  background(0, Math.random() * 127, 0);
  rectMode(CENTER);
}

function mousePressed() {
  pepes.push(new PepeIcon(mouseX, mouseY));
}
function draw() {
  push();
  tint(100);

  pop();
  //   background(0, noise(deltaTime * 0.005) * 127, 0);

  if (pepes) {
    for (let pepe in pepes) {
      pepes[pepe].draw();
      if (
        pepe.x > 0 - pepe.w ||
        pepe.x < 0 - pepe.w ||
        pepe.y < 0 - pepe.h ||
        pepe.y > height + pepe.h
      ) {
        delete pepes[pepe];
        pepes.push(new PepeIcon());
      }
    }
  }
}
