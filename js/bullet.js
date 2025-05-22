class Bullet {
  constructor(gameScreen, positionX, positionY) {
    this.gameScreen = gameScreen;
    this.left = positionX;
    this.top = positionY;
    this.width = 20;
    this.height = 50;
    this.element = document.createElement("img");
    this.element.src = "../images/bullet.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top = this.top - 5;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle) {
    const bulletRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      bulletRect.left < obstacleRect.right &&
      bulletRect.right > obstacleRect.left &&
      bulletRect.top < obstacleRect.bottom &&
      bulletRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
