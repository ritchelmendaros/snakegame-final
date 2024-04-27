import React, { useState, useEffect } from "react";
import GamePieces from "./GamePieces";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collisionType, setCollisionType] = useState(null);

  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }

    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };

  }, [gameOver]);

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <p className="score">Score: {score}</p>
        <p className="high-score">High Score: {highScore}</p>
        {gameOver && (
          <div className="game-over">
            <p>Game Over! {collisionType === "wall" ? "You Hit the wall" : "You Ate yourself"}!</p>
            <p>Press Enter to reset the game.</p>
          </div>
        )}
        {!gameOver && (
          <GamePieces
            score={score}
            setScore={setScore}
            onGameOver={(type) => handleGameOver(type)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
