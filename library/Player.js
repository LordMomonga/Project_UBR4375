export  class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  draw() {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, 40, 40);
  }

  update() {
    this.y++;
  }
}
