window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let ourGame;
  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    //easy way is to reload the page
    // window.location.reload();\
    startGame();
  });
  //keyboard event listeners
  window.addEventListener("keydown", (event) => {
    //moving left and right
    if (event.code === "ArrowLeft") {
      ourGame.player.directionX = -3;
    }
    if (event.code === "ArrowRight") {
      ourGame.player.directionX = 3;
    }
    //moving up and down
    if (event.code === "ArrowUp") {
      ourGame.player.directionY = -3;
    }
    if (event.code === "ArrowDown") {
      ourGame.player.directionY = 3;
    }
    //event listener for bullet
    if (event.code === "Space") {
      const carLeft = ourGame.player.left + 62 - 10;
      const carTop = ourGame.player.top;

      ourGame.player.bullets.push(
        new Bullet(ourGame.gameScreen, carLeft, carTop)
      );
      //play sound
      ourGame.playBoom();
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
      ourGame.player.directionX = 0;
    }
    if (event.code === "ArrowRight") {
      ourGame.player.directionX = 0;
    }
    if (event.code === "ArrowUp") {
      ourGame.player.directionY = 0;
    }
    if (event.code === "ArrowDown") {
      ourGame.player.directionY = 0;
    }
  });
  function startGame() {
    console.log("start game");
    ourGame = new Game();
    ourGame.start();
  }
};
