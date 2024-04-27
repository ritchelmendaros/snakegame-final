import React from "react";
import "../css/SnakeGameBoard.css";
import GameOver from "../lib/utils.js";

class SnakeGameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      gameLoopTimeout: 80,
      timeoutId: 0,
      startSnakeSize: 0,
      snake: [],
      apple: {},
      direction: "right",
      directionChanged: false,
      isGameOver: false,
      snakeColor: "blue",
      appleColor: "red",
      score: 0,
      highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
      newHighScore: false,
    };
  }

  componentDidMount() {
    this.initGame();
    window.addEventListener("keydown", this.handleKeyDown);
    try {
      this.gameLoop();
    } catch (error) {
      console.error("An error occurred in the game loop:", error);
      // Handle the error gracefully, e.g., set isGameOver to true
      this.setState({ isGameOver: true });
    }
  }

  initGame() {
    // Game size initialization
    let percentageWidth = this.props.percentageWidth || 40;
    let width =
      document.getElementById("GameBoard").parentElement.offsetWidth *
      (percentageWidth / 100);
    width -= width % 30;
    if (width < 30) width = 30;
    let height = (width / 3) * 2;
    let blockWidth = width / 30;
    let blockHeight = height / 20;
  
    // Increase width and height
    width *= 1.2;
    height *= 1.2;
  
    // snake initialization
    let startSnakeSize = this.props.startSnakeSize || 6;
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }
  
    // apple position initialization
    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }
  
    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      startSnakeSize,
      snake,
      apple: { Xpos: appleXpos, Ypos: appleYpos },
    });
  }
  

  gameLoop() {
    let timeoutId = setTimeout(() => {
      if (!this.state.isGameOver) {
        this.moveSnake();
        this.tryToEatSnake();
        this.tryToEatApple();
        this.setState({ directionChanged: false });
      }

      this.gameLoop();
    }, this.state.gameLoopTimeout);

    this.setState({ timeoutId });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  resetGame() {
    let width = this.state.width;
    let height = this.state.height;
    let blockWidth = this.state.blockWidth;
    let blockHeight = this.state.blockHeight;
    let apple = this.state.apple;
  
    // snake reset
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < this.state.startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }
  
    // apple position reset
    apple.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    apple.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;
    while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      apple.Ypos =
        Math.floor(
          Math.random() * ((height - blockHeight) / blockHeight + 1)
        ) * blockHeight;
    }
  
    this.setState({
      snake,
      apple,
      direction: "right",
      directionChanged: false,
      isGameOver: false,
      gameLoopTimeout: 50,
      // Retain the snake color state
      snakeColor: this.state.snakeColor,
      appleColor: "red",
      score: 0,
      newHighScore: false,
    });
  }
  

  getRandomColor() {
    let hexa = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)];
    return color;
  }

  moveSnake() {
    let snake = this.state.snake;
    let previousPartX = this.state.snake[0].Xpos;
    let previousPartY = this.state.snake[0].Ypos;
    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;
    this.moveHead();
    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].Xpos;
      tmpPartY = snake[i].Ypos;
      snake[i].Xpos = previousPartX;
      snake[i].Ypos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }
    this.setState({ snake });
  }

  tryToEatApple() {
    let snake = this.state.snake;
    let apple = this.state.apple;

    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      let width = this.state.width;
      let height = this.state.height;
      let blockWidth = this.state.blockWidth;
      let blockHeight = this.state.blockHeight;
      let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos };
      let highScore = this.state.highScore;
      let newHighScore = this.state.newHighScore;
      let gameLoopTimeout = this.state.gameLoopTimeout;

      // increase snake size
      snake.push(newTail);

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
      while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth;
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight;
      }

      // increment high score if needed
      if (this.state.score === highScore) {
        highScore++;
        localStorage.setItem("snakeHighScore", highScore);
        newHighScore = true;
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5;

      this.setState({
        snake,
        apple,
        score: this.state.score + 1,
        highScore,
        newHighScore,
        gameLoopTimeout,
      });
    }
  }

  tryToEatSnake() {
    let snake = this.state.snake;

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos)
        this.setState({ isGameOver: true });
    }
  }

  isAppleOnSnake(appleXpos, appleYpos) {
    let snake = this.state.snake;
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true;
    }
    return false;
  }

  moveHead() {
    switch (this.state.direction) {
      case "left":
        this.moveHeadLeft();
        break;
      case "up":
        this.moveHeadUp();
        break;
      case "right":
        this.moveHeadRight();
        break;
      default:
        this.moveHeadDown();
    }
  }

  moveHeadLeft() {
    let blockWidth = this.state.blockWidth;
    let snake = this.state.snake;
    // Calculate the new X position for the snake's head
    let newXpos = snake[0].Xpos - blockWidth;
    // Check if the snake's head collides with the left boundary
    if (newXpos < 0) {
      this.setState({ isGameOver: true });
      return;
    }
    // Update the X position of the snake's head
    snake[0].Xpos = newXpos;
    this.setState({ snake });
  }

  moveHeadUp() {
    let blockHeight = this.state.blockHeight;
    let snake = this.state.snake;
    // Calculate the new Y position for the snake's head
    let newYpos = snake[0].Ypos - blockHeight;
    // Check if the snake's head collides with the top boundary
    if (newYpos < 0) {
      this.setState({ isGameOver: true });
      return;
    }
    // Update the Y position of the snake's head
    snake[0].Ypos = newYpos;
    this.setState({ snake });
  }

  moveHeadRight() {
    let width = this.state.width;
    let blockWidth = this.state.blockWidth;
    let snake = this.state.snake;
    // Calculate the new X position for the snake's head
    let newXpos = snake[0].Xpos + blockWidth;
    // Check if the snake's head collides with the right boundary
    if (newXpos >= width) {
      this.setState({ isGameOver: true });
      return;
    }
    // Update the X position of the snake's head
    snake[0].Xpos = newXpos;
    this.setState({ snake });
  }

  moveHeadDown() {
    let height = this.state.height;
    let blockHeight = this.state.blockHeight;
    let snake = this.state.snake;
    // Calculate the new Y position for the snake's head
    let newYpos = snake[0].Ypos + blockHeight;
    // Check if the snake's head collides with the bottom boundary
    if (newYpos >= height) {
      this.setState({ isGameOver: true });
      return;
    }
    // Update the Y position of the snake's head
    snake[0].Ypos = newYpos;
    this.setState({ snake });
  }

  handleKeyDown(event) {
    // if spacebar is pressed to run a new game
    if (this.state.isGameOver && event.keyCode === 32) {
      this.resetGame();
      return;
    }

    if (this.state.directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        this.goLeft();
        break;
      case 38:
      case 87:
        this.goUp();
        break;
      case 39:
      case 68:
        this.goRight();
        break;
      case 40:
      case 83:
        this.goDown();
        break;
      default:
    }
    this.setState({ directionChanged: true });
  }

  goLeft() {
    let newDirection = this.state.direction === "right" ? "right" : "left";
    this.setState({ direction: newDirection });
  }

  goUp() {
    let newDirection = this.state.direction === "down" ? "down" : "up";
    this.setState({ direction: newDirection });
  }

  goRight() {
    let newDirection = this.state.direction === "left" ? "left" : "right";
    this.setState({ direction: newDirection });
  }

  goDown() {
    let newDirection = this.state.direction === "up" ? "up" : "down";
    this.setState({ direction: newDirection });
  }

    render() {
      // Game over
      if (this.state.isGameOver) {
        return (
          <GameOver
            width={this.state.width}
            height={this.state.height}
            highScore={this.state.highScore}
            newHighScore={this.state.newHighScore}
            score={this.state.score}
          />
        );
      }

      return (
        <div>
          <div className="score-container">
            <div className="score">
              <span style={{ color: "white", fontWeight: "bold" }}>Score:</span>{" "}
              <span style={{ color: "blue", fontWeight: "bold" }}>
                {this.state.score}
              </span>
            </div>
            <div className="score">
              <span style={{ color: "white", fontWeight: "bold" }}>
                Highest Score:
              </span>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {this.state.highScore}
              </span>
            </div>
          </div>
          <div
            id="GameBoard"
            style={{
              width: this.state.width,
            height: this.state.height,
              borderWidth: this.state.width / 50,
            }}
          >
            {this.state.snake.map((snakePart, index) => {
              return (
                <div
                  key={index}
                  className="Block"
                  style={{
                    width: this.state.blockWidth,
                    height: this.state.blockHeight,
                    left: snakePart.Xpos,
                    top: snakePart.Ypos,
                    background: this.state.snakeColor,
                  }}
                />
              );
            })}
            <div
              className="Block"
              style={{
                width: this.state.blockWidth,
                height: this.state.blockHeight,
                left: this.state.apple.Xpos,
                top: this.state.apple.Ypos,
                background: this.state.appleColor,
              }}
            />
          </div>
        </div>
      );
    }
  }

export default SnakeGameBoard;
