import styled from "styled-components"

const Container = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  font-weight: 600;
  font-size: 10.24px;
  line-height: 12px;
  text-align: center;
  background: #4d5b9e;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  color: #f5f7fb;
  border: none;
`

export default function Footer(props) {
  return (
    <Container>
      {props.showResult ? (
        <>
          <span>
            You scored {props.score}/{props.total} correct answers
          </span>
          <Button onClick={() => props.newGame()}>Play Again</Button>
        </>
      ) : (
        <>
          <span>{props.total - props.answered} questions left to answer</span>
          <Button onClick={() => props.checkAnswers(props.total)}>
            Check Answers
          </Button>
        </>
      )}
    </Container>
  )
}
