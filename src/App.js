import React, { useState, useEffect } from "react"
import Intro from "./Intro"
import "./styles.css"
import Quiz from "./Quiz"
import Footer from "./Footer.js"
import { htmlDecode, shuffle } from "./utils"

export default function App() {
  const [allQuiz, setAllQuiz] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const newGame = () => {
    setScore(0)
    setShowResult(false)
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setAllQuiz(
          data.results.map((obj, index) => {
            let correct_answer = htmlDecode(obj.correct_answer)
            return {
              ...obj,
              id: index,
              question: htmlDecode(obj.question),
              correct_answer: correct_answer,
              options: shuffle(
                [correct_answer, ...obj.incorrect_answers].map((ans) =>
                  htmlDecode(ans)
                )
              ),
            }
          })
        )
      )
  }
  useEffect(() => {
    setUserAnswers(allQuiz.length ? allQuiz.map((obj) => "") : [])
  }, [allQuiz])

  const selectOption = (quizId, answer) => {
    setUserAnswers((prevUserAnswers) =>
      prevUserAnswers.map((e, index) => (index === quizId ? answer : e))
    )
  }

  const checkAnswers = () => {
    const check = userAnswers.map(
      (answer, index) => answer === allQuiz[index].correct_answer
    )
    setScore(check.reduce((acc, curr) => (curr ? ++acc : acc), 0))
    setShowResult(true)
  }

  const quizArray = allQuiz.map((quiz) => (
    <Quiz
      key={quiz.id}
      quiz={quiz}
      selectOption={selectOption}
      selectedOption={userAnswers[quiz.id]}
      showResult={showResult}
    />
  ))

  return (
    <div className="app">
      {allQuiz.length === 0 ? (
        <Intro newGame={newGame} />
      ) : (
        <div className="play">
          {quizArray}
          <Footer
            score={score}
            newGame={newGame}
            checkAnswers={checkAnswers}
            showResult={showResult}
          />
        </div>
      )}
    </div>
  )
}
