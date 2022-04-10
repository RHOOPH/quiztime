import React from "react"

export default function Footer(props) {
  return (
    <div className="footer">
      {props.showResult ? (
        <div className="result">
          <div>You scored {props.score}/5 correct answers</div>
          <div className="btn" onClick={() => props.newGame()}>
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
  )
}
