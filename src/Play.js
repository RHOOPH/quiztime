import styled from "styled-components"
import Quiz from "./Quiz"
import { useState, useEffect } from "react"
import Footer from "./Footer.js"
import { htmlDecode, shuffle } from "./utils"
import { SpinnerCircularFixed as Spinner } from "spinners-react"
import { animated, useTransition } from "@react-spring/web"

const Container = styled(animated.div)`
  padding: 40px 2rem;
  max-width: 70ch;
  background-color: white;
  overflow: hidden;
`
const Loading = styled(animated.div)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: #f5f7fb;
`
const Retry = styled(Loading)`
  flex-direction: column;
  & button {
    margin-top: 1rem;
  }
`

export default function Play() {
  const LOADING = "loading"
  const ERROR = "error"
  const READY = "ready"

  const [allQuiz, setAllQuiz] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState(LOADING)

  const getData = () => {
    setStatus(LOADING)
    // https://opentdb.com/api.php?amount=5&category=18&type=multiple
    // https://opentdb.com/api.php?amount=10&category=9&difficulty=easy
    fetch("https://opentdb.com/api.php?amount=7&category=18")
      .then((res) => res.json())
      .then((data) => {
        setAllQuiz(
          data.results.map((obj, index) => {
            const correct_answer = htmlDecode(obj.correct_answer)
            const incorrect_answers = obj.incorrect_answers.map((ans) =>
              htmlDecode(ans)
            )

            return {
              ...obj,
              id: index,
              question: htmlDecode(obj.question),
              correct_answer: correct_answer,
              options: shuffle([correct_answer, ...incorrect_answers]),
            }
          })
        )
        //if fetch resolves whithin 400ms UI breaks as transition animation is still running.
        setStatus(READY)
        setUserAnswers(data.results.map((obj) => ""))
        setScore(0)
        setShowResult(false)
      })
      .catch((error) => {
        console.error("Oops, something went wrong ", error)
        setStatus(ERROR)
      })
  }

  const newGame = () => {
    getData()
  }

  const selectOption = (quizId, answer) => {
    setUserAnswers((prevUserAnswers) =>
      prevUserAnswers.map((e, index) => (index === quizId ? answer : e))
    )
  }

  const checkAnswers = (total) => {
    const check = userAnswers.map(
      (answer, index) => answer === allQuiz[index].correct_answer
    )
    if (total === check.length) {
      setScore(check.reduce((acc, curr) => (curr ? ++acc : acc), 0))
      setShowResult(true)
    } else {
    }
  }

  const quizArray = allQuiz.map((quiz, i) => (
    <Quiz
      key={quiz.id}
      quiz={quiz}
      selectOption={selectOption}
      selectedOption={userAnswers[quiz.id]}
      showResult={showResult}
      index={i}
    />
  ))

  useEffect(() => {
    newGame()
  }, [])

  const transition = useTransition(status, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    exitBeforeEnter: true,
    config: { duration: 400 },
    clamp: true,
  })

  return transition((style, item) =>
    item === LOADING ? (
      <Loading style={style}>
        <Spinner size="100px" color="white" />
      </Loading>
    ) : item === ERROR ? (
      <Retry style={style}>
        <div>Oops something went wrong</div>
        <button
          onClick={() => {
            // added timeout of 400 ms so that animation has time to finish. Otherwise nothing gets rendered.
            setStatus(LOADING)
            setTimeout(() => newGame(), 400)
          }}
        >
          Retry
        </button>
      </Retry>
    ) : (
      <Container style={style}>
        {quizArray}
        <Footer
          score={score}
          total={quizArray.length}
          newGame={newGame}
          checkAnswers={checkAnswers}
          showResult={showResult}
          answered={userAnswers.reduce(
            (acc, curr) => (curr === "" ? acc : acc + 1),
            0
          )}
        />
      </Container>
    )
  )
}
