import React from "react";

export default function Footer(props) {
  return (
    <div className="footer">
      {props.didCheckAnswer ? (
        <div className="result">
          <div>You scored {props.correctAnswers}/5 correct answers</div>
          <div
            className="btn"
            onClick={() => props.setStartGame((prevGame) => prevGame + 1)}
          >
            <div className="btn-txt">Play Again</div>
          </div>
        </div>
      ) : (
        <div className="check">
          <div className="btn" onClick={props.checkAnswers}>
            <div className="btn-txt">Check Answers</div>
          </div>
        </div>
      )}
    </div>
  );
}
