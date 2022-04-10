export default function Quiz(props) {
  const options = props.quiz.options.map((answer, index) => {
    let computedClass = "option"
    const correctAnswer = props.quiz.correct_answer
    if (props.showResult) {
      if (answer === correctAnswer) computedClass += " correct"
      else {
        if (
          props.selectedOption !== correctAnswer &&
          props.selectedOption === answer
        )
          computedClass += " wrong"
        else computedClass += " disabled"
      }
    } else {
      if (props.selectedOption === answer) computedClass += " selected"
    }

    return (
      <div
        key={index}
        className={computedClass}
        {...(!props.showResult && {
          onClick: () => props.selectOption(props.quiz.id, answer),
        })}
      >
        <div className="option-txt">{answer}</div>
      </div>
    )
  })

  return (
    <div>
      <div className="quiz">
        <h2 className="question">{props.quiz.question}</h2>
        <div className="options">{options}</div>
      </div>
      <hr />
    </div>
  )
}
