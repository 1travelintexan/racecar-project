class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.highScoresElement = document.getElementById("high-scores");
    this.player = new Player(this.gameScreen, 75, 400, 125, 200);
    this.height = 600;
    this.width = 500;
    this.obstacles = [new Obstacle(this.gameScreen, 125, 200)];
    this.score = 0;
    this.lives = 1;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 0;

    //adding audio
    this.boom = new Audio("../assets/boom.wav");
    this.boom.volume = 0.1;
    this.horn = new Audio("../assets/horn.wav");
    this.horn.volume = 0.1;
  }
  start() {
    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = `${this.width}px`;
    //hide the start screen
    this.startScreen.style.display = "none";
    //show the game container
    this.gameContainer.style.display = "flex";
    //show the game screen
    this.gameScreen.style.display = "block";
    //hide the game over screen
    this.gameEndScreen.style.display = "none";
    //reset the lives and score to the correct numbers for the restart
    this.drawHearts();

    this.scoreElement.innerText = this.score;

    //setInterval that runs 60 times per second
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    //increase the counter so I can add an obstacle every 120 frames
    this.counter++;
    // console.log("game loop");
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    this.player.move();

    //check if the counter is divisible by 60, then push a new obstacle to the array
    if (this.counter % 180 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen, 125, 200));
    }
    // obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      //variable for the current obstacle in the loop
      const currentObstacle = this.obstacles[i];
      //calling the .move method on each obstacle
      currentObstacle.move();

      //*****************Bullets ***************/
      //loop for the players bullets array (inside the loop for obstacles)
      for (let j = 0; j < this.player.bullets.length; j++) {
        const currentBullet = this.player.bullets[j];
        //make the bullet move
        currentBullet.move();
        if (currentBullet.top < -60) {
          //remember to remove the obstacle after it passes the bottom
          currentBullet.element.remove();
          //remove the data of the obstacle from the array of this.obstacles
          this.player.bullets.splice(j, 1);
          j--;
        }
        //check if the bullet hits a red car
        if (currentBullet.didCollide(currentObstacle)) {
          console.log("Bang!");
          //remove the image of the obstacle from the DOM
          currentObstacle.element.remove();
          currentBullet.element.remove();
          //remove the data of the obstacle from the array of this.obstacles
          this.obstacles.splice(i, 1);
          i--;
          //remove the data of the bullets from the array of this.player.bullets
          this.player.bullets.splice(j, 1);
          j--;
        }
      }

      //checking if the player ever hits an obstacle
      if (this.player.didCollide(currentObstacle)) {
        console.log("hit!");
        //remove the image of the obstacle from the DOM
        currentObstacle.element.remove();
        //remove the data of the obstacle from the array of this.obstacles
        this.obstacles.splice(i, 1);
        i--;
        // to subtract a life from the game if there is a collision
        this.lives--;
        this.horn.play();
        //update the DOM to show the new number of lives
        this.drawHearts();
        //spin the car when collision
        this.player.element.classList.add("spin3d");
        //remove the class after .4 seconds
        setTimeout(() => {
          this.player.element.classList.remove("spin3d");
        }, 1000);
        //if the this.lives === 0, then game is over
        if (this.lives === 0) {
          this.isGameOver = true;
        }
      }

      //checking if the obstacle passes the bottom of the page
      if (currentObstacle.top > 600) {
        this.score++;
        this.scoreElement.innerText = this.score;

        //remember to remove the obstacle after it passes the bottom
        currentObstacle.element.remove();
        //remove the data of the obstacle from the array of this.obstacles
        this.obstacles.splice(i, 1);
        i--;
      }
    }
  }
  gameOver() {
    this.player.element.remove();
    this.player = null;
    //this removes all the bad cars
    this.obstacles.forEach((oneObstacle) => {
      oneObstacle.element.remove();
    });
    this.obstacles = [];

    //hide the game screen
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    //show the game over screen
    this.gameEndScreen.style.display = "block";

    //high scores
    //first check if there are any scores
    this.highScoresElement.innerHTML = "";
    const highScoresFromLS = localStorage.getItem("high-scores");
    if (!highScoresFromLS) {
      localStorage.setItem("high-scores", JSON.stringify([this.score]));
    } else {
      const parsedHighScores = JSON.parse(highScoresFromLS);
      parsedHighScores.push(this.score);
      const topThreeScores = parsedHighScores
        .sort((a, b) => b - a)
        .splice(0, 3);

      localStorage.setItem("high-scores", JSON.stringify(topThreeScores));
      topThreeScores.forEach((oneScore) => {
        const liElement = document.createElement("li");
        liElement.innerText = oneScore;
        this.highScoresElement.appendChild(liElement);
      });
    }
  }
  drawHearts() {
    this.livesElement.innerHTML = "";
    for (let i = 0; i < this.lives; i++) {
      const imgElement = document.createElement("img");
      imgElement.src = "../images/heart.jpg";
      imgElement.classList.add("heart");
      this.livesElement.appendChild(imgElement);
    }
  }
  playBoom() {
    this.boom.play();
  }
}
