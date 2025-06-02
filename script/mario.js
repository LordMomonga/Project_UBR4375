const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


canvas.height = 576;
canvas.width = 1700;

function loadImage(url){
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
    console.log(url);
  })

}
class SpriteSheet{
  constructor(image, width, height){
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map()
  }
  define(name, x, y){
    const buffer = document.createElement("canvas")
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext("2d")
    .drawImage(this.image, x *this.width, y*this.height,
       this.width, this.height,
      0, 0,
      this.width, 
      this.height);
      this.tiles.set(name, buffer);

  }
  draw(name, context, x, y){
    const buffer = this.tiles.get(name)
    context.drawImage(buffer,x,y)

  }
  drawTiles(name, context, x, y){
    this.draw(name, context, x*this.width, y * this.height)
  }
}

let gravity = 0.5;
// generate the sprite class for use 
class Sprites {
  constructor(position, imageSource){
    this.position = position
    this.image = new Image();
    this.image.src = imageSource 
  }
  draw(){
        if (!this.image) return; 
    const sprites = new SpriteSheet(this.image, 16, 16)
    sprites.define("ground", 0, 0);
    sprites.define("sky", 3, 23);
    sprites.draw("ground", context, 0, canvas.height - 16)
   
     for (let x = 0; x < 110; x++) {
      for (let y = 0; y < 40; y++) {
        
          sprites.drawTiles("sky", context, x, y);
      }
      
      
     }
     for (let x = 0; x < 110; x++) {
       for (let y = 32; y < 40; y++) {
         sprites.drawTiles("ground", context, x, y);
       }
     }
   
  }
  update(){
    this.draw()
  }
}


class Obstacle {
  constructor(position, imageSource, px, py) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSource;
    this.py = py;
    this.px = px;
    this.collision = false
    this.hitBox = {
      position: {
        x: this.position.x ,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
  }
  hiter() {
    this.hitBox = {
      position: {
        x: this.position.x  ,
        y: this.position.y ,
      },
      width: 165,
      height: 20,
    };
  }

  draw() {
    

    if (!this.image) return;
    const sprites = new SpriteSheet(this.image, 16, 16);
    sprites.define("ground", 0, 0);

    sprites.draw("ground", context, 0, canvas.height - 16);

    for (let x = this.px; x < this.px + 10; x++) {
      for (let y = this.py; y < this.py + 1; y++) {
        sprites.drawTiles("ground", context, x, y);
      }
    }
  }
  collider(y) {
    if(this.hitBox.y === y ){
      this.collision = true;
    }

  }
  update(y) {
    this.hiter();
   
     context.fillStyle = "rgba(255,0, 0, 0.5)";
     context.fillRect(
       this.hitBox.position.x,
       this.hitBox.position.y,
       this.hitBox.width,
       this.hitBox.height
     );
      this.collider(y);
    this.draw();
  }
}


class SpritePlayer{
  constructor(position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1){
    this.position = position;
    this.image = new Image();
     this.image.onload = ()=>{
      this.width = this.image.width;
      this.height = this.image.height;
    }
    this.image.src = imageSrc;
    this.frameRate = frameRate;
    this.currentFrameRate = 0;
    this.frameBuffer = frameBuffer;
  }
  draw(){
  if(!this.image) return
  const cropBox = {
    position: {
      x: 0,
      y:0,
    },
    width: this.image.width,
    height:this.image.height ,
  }

  context.drawImage(
    this.image,
    cropBox.position.x,
    cropBox.position.y,
    cropBox.width,
    cropBox.height,
    this.position.x,
    this.position.y,
    this.width,
    this.height
  );
  }
  update(){
    this.draw()
  }
}

class Player {
  constructor({position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1.5, collisionBlock, hitBox, animations}) {
  this.imageSrc = imageSrc
  this.scale = scale;
    this.position = position;
    this.frameRate = frameRate;
    this.currentFrameRate = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrame = 0;
    this.lastDiretion = "right"

    this.velocity = {
      x: 0,
      y: 1,
    };
    this.hitBox = {
      position:{
        x:this.position.x,
        y:this.position.y
      },
      width: 10,
      height:10
    }
  
    this.image = new Image()
    this.image.onload = ()=>{
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
    }
    this.image.src = imageSrc;
        this.animations = animations;
        for(let key in this.animations) {
          const image = new Image()
          image.src = this.animations[key].imageSrc;
          this.animations[key].image = image
        }

  }
  switchSprite(key){
    if(this.image === this.animations[key])return
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;

  }
  hiter(){
     this.hitBox = {
       position: {
         x: this.position.x + (this.image.width / this.frameRate ) /2,
         y: this.position.y + (this.image.height - this.hitBox.height) * 5,
       },
       width: 50,
       height: 70,
     };

  }
  
  draw() {
    const cropBox = {
      position: {
        x: this.currentFrameRate * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
     
context.drawImage(
  this.image,
  cropBox.position.x,
  cropBox.position.y,
  cropBox.width,
  cropBox.height,
  this.position.x,
  this.position.y,
  this.width ,
  this.height
);   /* context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 40, this.height);*/
  }
  update() {
    this.hiter()
    
    //draw image
    context.fillStyle = "rgba(0,255, 255, 0)"
    context.fillRect(this.position.x, this.position.y,this.width, this.height);
     context.fillStyle = "rgba(255,0, 0, 0.5)";
     context.fillRect(
       this.hitBox.position.x,
       this.hitBox.position.y,
       this.hitBox.width,
       this.hitBox.height
     );
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y + 65 < canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
    this.updateFrame();
  }
  updateFrame(){
    this.elapsedFrame ++ 
    if(this.elapsedFrame % this.frameBuffer === 0){
    if(this.currentFrameRate < this.frameRate - 1){
       this.currentFrameRate++;
    }else  this.currentFrameRate = 0; }
   
  }
}
const key = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  p:{
    pressed: false,
  }
};
const background = new Sprites({ x: 0, y: 0 }, "../images/tiles.png");
const obs = new Obstacle({ x: 30, y: 383 }, "../images/tiles.png", 2, 24);
const obs1 = new Obstacle({ x: 318, y: 430 }, "../images/tiles.png", 20, 27);


const player = new Player({
  position: {
    x: 5,
    y: 2,
  },
  imageSrc: "../images/_Idle.png",
  frameRate: 10,
  animations: {
    idle: {
      imageSrc: "../images/_Idle.png",
      frameRate: 10,
      frameBuffer: 3,
    },

    run: {
      imageSrc: "../images/_Run.png",
      frameRate: 10,
      frameBuffer: 3,
    },
    jump: {
      imageSrc: "../images/_Jump.png",
      frameRate: 3,
      frameBuffer: 3,
    },
    fall: {
      imageSrc: "../images/_Fall.png",
      frameRate: 3,
      frameBuffer: 3,
    },
    fight: {
      imageSrc: "../images/_Attack2.png",
      frameRate: 6,
      frameBuffer: 2,
    },
  },
});


function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
  obs.update()
  obs1.update();
  player.update();

  player.velocity.x = 0;
  if(key.d.pressed){
    player.switchSprite("run");
     player.velocity.x = 6;
    player.lastDiretion = "right";
    }
  else if (key.a.pressed){
     player.velocity.x = -5;
       player.switchSprite("run");
       player.lastDiretion = "left";
    }else if(key.p.pressed){
      player.switchSprite("fight");

    }
  else if(player.velocity.y === 0){
     player.switchSprite("idle");

  }
  if (player.velocity.y < 0) {
    player.switchSprite("jump")
  }else if(player.velocity.y > 0){
    player.switchSprite("fall");
  }
}
animate();

window.addEventListener("keydown", (event) => {
  console.log(event);
  switch (event.key) {
    case "d":
      key.d.pressed = true;
      break;
    case "a":
      key.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -15;
      break;
      case "p":
          key.p.pressed = true;
        break
  }
});
window.addEventListener("keyup", (event) => {
  console.log(event);
  switch (event.key) {
    case "d":
      key.d.pressed = false;
      break;
    case "a":
      key.a.pressed = false;
      break;
    case "p":
      key.p.pressed = false;
      break;
  }
});
