import React from "react";

function GameOver(props) {
  return (
    <>
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Score</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {props.leaderboard.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.score}</td>
                <td>{`${entry.user.firstname} ${entry.user.lastname}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="score-container">
        <div className="score">
          <span style={{ color: "white", fontWeight: "bold" }}>Score:</span>{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {props.score}
          </span>
        </div>
        <div className="score">
          <span style={{ color: "white", fontWeight: "bold" }}>
            Highest Score:
          </span>{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {props.highScore}
          </span>
        </div>
      </div>

      <div
        id="GameBoard"
        style={{
          width: props.width,
          height: props.height,
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