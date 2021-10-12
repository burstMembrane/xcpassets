let pepes = [];
const numPepes = 100;
let p;
p5.disableFriendlyErrors = true; // disables FES

class PepeIcon {
  constructor(icon, x = null, y = null) {
    this.icon = icon;
    this.x = x || Math.random() * 400 - 99;
    this.y = y || Math.random() * 560;
    this.w = 200;
    this.h = 200;
    this.accelX = Math.random() * 5 - 2.5;
    this.accelY = Math.random() * 5 - 2.5;
    this.color = (255, 255, 255, 127);
    this.speed = 2 + Math.random() * 5;
    this.speedOffset = this.speed - this.speed / 2;
  }

  checkPos() {
    if (this.x < 0 - this.w) this.x = width;
    if (this.x > width + this.w) this.x = 0 - this.w;
    if (this.y < 0 - this.h) this.y = height;
    if (this.y > height + this.h) this.y = 0 - this.h;
  }
  draw() {
    push();
    translate((this.x += this.accelX), (this.y += this.accelY));
    image(this.icon, 0, 0);

    if (mouseX || mouseY) {
      this.accelX = (mouseX / width) * this.speedOffset;
      this.accelY = (mouseY / height) * this.speedOffset;
    }
    pop();
    if (frameCount % 30 == 0) this.checkPos();
  }
}

const timeFunction = (func) => {
  console.time(`${func.name}`);
  func();
  console.timeEnd(`${func.name}`);
};

function drawFrameRate() {
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, 10);
}

let bg;
let icon;
let canvas;

function preload() {
  icon = loadImage("PEPEFACE.png");

  for (let i = 0; i < numPepes; i++) {
    pepes.push(new PepeIcon(icon));
  }
  if (window.top != window.self) {
    console.log("in iframe!");
    document.querySelector("body").classList.add("in-iframe");
    // In a Frame or IFrame
  } else {
    console.log("not in iframe!");
  }
}
function setup() {
  drawingContext.imageSmoothingEnabled = false;

  canvas = createCanvas(400, 560, P2D);
  pixelDensity(1);

  background(0, Math.random() * 127, 0);
  rectMode(CENTER);
}

function mousePressed() {
  pepes.shift();
  pepes.push(new PepeIcon(icon, mouseX - 100, mouseY - 100));
}

function draw() {
  // background(4, 78, 126);

  if (frameCount % 10 == 0) {
    push();

    background(78, 126, 4, 15);
    pop();
  }

  if (pepes) {
    for (let pepe in pepes) {
      pepes[pepe].draw();
      if (
        pepe.x > 0 - pepe.w ||
        pepe.x < 0 - pepe.w ||
        pepe.y < 0 - pepe.h ||
        pepe.y > height + pepe.h
      ) {
        pepes.shift();
        pepes.push(new PepeIcon(icon));
      }
    }
  }
  drawFrameRate();
}
