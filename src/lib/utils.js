import React from "react";

function GameOver(props) {
  return (
    <>
      <div className="score-container">
        <div className="score">
          <span style={{ color: "white", fontWeight:"bold" }}>Score:</span>{" "}
          <span style={{ color: "blue", fontWeight:"bold" }}>{props.score}</span>
        </div>
        <div className="score">
          <span style={{ color: "white", fontWeight:"bold" }}>Highest Score:</span>{" "}
          <span style={{ color: "red", fontWeight:"bold" }}>{props.highScore}</span>
        </div>
      </div>

      <div
        id="GameBoard"
        style={{
          width: props.width,
          height: props.height,
          borderRadius: '5px',
          borderWidth: props.width / 50,
        }}
      >
        <div id="GameOver" style={{ fontSize: props.width / 15 }}>
          <div id="GameOverText">GAME OVER</div>
          <div id="PressSpaceText">Press Space to restart</div>
        </div>
      </div>
    </>
  );
}

export default GameOver;
