import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  justify-content: center;
`
const Title = styled.h1`
  font-family: "Karla";
  font-weight: bold;
  font-size: 31.25px;
  margin-bottom: 10px;
`

const SubTitle = styled.h4`
  margin-top: 0;
  font-weight: 400;
  text-align: center;
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  width: 193px;
  height: 52px;
  font-weight: 500;
  color: #f5f7fb;
  background: #4d5b9e;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
`

export default function Intro(props) {
  return (
    <Container>
      <Title>Quizzical</Title>
      <SubTitle>Test your knowledge about computers</SubTitle>
      <Button onClick={() => props.newGame()}>
        <span>Start Quiz</span>
      </Button>
    </Container>
  )
}
