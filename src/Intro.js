import React from "react"

export default function Intro(props) {
  return (
    <div className="Intro">
      <h1>Quizzical</h1>
      <h4>Test your knowledge about computers</h4>
      <div onClick={() => props.newGame()}>
        <div className="btn-txt">Start Quiz</div>
      </div>
    </div>
  )
}
