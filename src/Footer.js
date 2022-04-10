import React from "react"

export default function Footer(props) {
  console.log("total=", props.total, " answered=", props.answered)
  return (
    <div className="footer">
      {props.showResult ? (
        <>
          <div>
            You scored {props.score}/{props.total} correct answers
          </div>
          <div className="btn" onClick={() => props.newGame()}>
            <div className="btn-txt">Play Again</div>
          </div>
        </>
      ) : (
        <>
          <div>{props.total - props.answered} questions left to answer</div>
          <div className="btn" onClick={() => props.checkAnswers(props.total)}>
            <div className="btn-txt">Check Answers</div>
          </div>
        </>
      )}
    </div>
  )
}
