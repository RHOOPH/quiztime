import React, { useState, useEffect } from "react";
import Intro from "./Intro";
import "./styles.css";
import Quiz from "./Quiz";
import Footer from "./Footer.js";
import htmlDecode from "./htmlDecode";
import shuffle from "./shuffle";

export default function App() {
  console.log("App rendered");
  const [startGame, setStartGame] = useState(0);
  const [allQuiz, setAllQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [didCheckAnswer, setdidCheckAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    console.log(`userAnswers changed to =${userAnswers}`);
  }, [userAnswers]);
  useEffect(() => {
    console.log(`didCheckAnswer changed to =${didCheckAnswer}`);
  }, [didCheckAnswer]);
  useEffect(() => {
    console.log(`allQuiz changed to =${allQuiz}`);
  }, [allQuiz]);
  useEffect(() => {
    if (startGame) {
      fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
        .then((res) => res.json())
        .then((data) =>
          setAllQuiz(
            data.results.map((obj, index) => ({
              ...obj,
              id: index,
              options: shuffle([obj.correct_answer, ...obj.incorrect_answers]),
            }))
          )
        );
      setdidCheckAnswer(false);
    }
  }, [startGame]);
  useEffect(() => {
    setUserAnswers(allQuiz.length ? allQuiz.map((obj) => "") : []);
  }, [allQuiz]);

  const selectOption = (quizId, answer) => {
    setUserAnswers((prevUserAnswers) =>
      prevUserAnswers.map((e, index) => (index === quizId ? answer : e))
    );
  };

  const checkAnswers = () => {
    const check = userAnswers.map(
      (answer, index) => answer === htmlDecode(allQuiz[index].correct_answer)
    );
    console.log(check);

    setCorrectAnswers(check.reduce((acc, curr) => (curr ? ++acc : acc), 0));
    console.log(correctAnswers);
    setdidCheckAnswer(true);
  };

  const quizArray = allQuiz.map((quiz) => (
    <Quiz
      key={quiz.id}
      quiz={quiz}
      selectOption={selectOption}
      selectedOption={userAnswers[quiz.id]}
      didCheckAnswer={didCheckAnswer}
    />
  ));

  return (
    <div className="app">
      {allQuiz.length === 0 ? (
        <Intro setStartGame={setStartGame} />
      ) : (
        <div className="play">
          {quizArray}
          <Footer
            correctAnswers={correctAnswers}
            setStartGame={setStartGame}
            checkAnswers={checkAnswers}
            didCheckAnswer={didCheckAnswer}
          />
        </div>
      )}
    </div>
  );
}
