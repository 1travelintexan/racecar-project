class Obstacle {
  constructor(gameScreen, width, height) {
    this.possibleXValues = [75, 280, 75, 280, 280, 280];
    this.gameScreen = gameScreen;
    this.randomIndex = Math.floor(Math.random() * this.possibleXValues.length);
    this.left = this.possibleXValues[this.randomIndex];
    this.top = -250;
    this.width = width;
    this.height = height;
    this.element = document.createElement("img");
    this.element.src = "../images/redCar.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top = this.top + 5;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
