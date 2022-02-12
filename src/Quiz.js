import React from "react";
import htmlDecode from "./htmlDecode";

export default function Quiz(props) {
  console.log(`quiz with id=${props.quiz.id} rendered`);

  const allAnswers = props.quiz.options.map((answers) => htmlDecode(answers));

  const options = allAnswers.map((answer, index) => {
    let computedClass = "option";
    const correctAnswer = htmlDecode(props.quiz.correct_answer);
    if (props.didCheckAnswer) {
      if (answer === correctAnswer) computedClass += " correct";
      else {
        if (
          props.selectedOption !== correctAnswer &&
          props.selectedOption === answer
        )
          computedClass += " wrong";
        else computedClass += " disabled";
      }
    } else {
      if (props.selectedOption === answer) computedClass += " selected";
    }

    return (
      <div
        key={index}
        className={computedClass}
        {...(!props.didCheckAnswer && {
          onClick: () => props.selectOption(props.quiz.id, answer),
        })}
      >
        <div className="option-txt">{answer}</div>
      </div>
    );
  });

  return (
    <div>
      <div className="quiz">
        <h2 className="question">{htmlDecode(props.quiz.question)}</h2>
        <div className="options">{options}</div>
      </div>
      <hr />
    </div>
  );
}
