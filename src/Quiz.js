import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Question = styled.h2`
  font-family: "Karla";
  font-size: 16px;
  max-width: 60ch;
`
const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 13px 10px;
  text-align: center;
  border: 0.794239px solid #4d5b9e;
  border-radius: 7.94239px;
  cursor: pointer;
  min-width: 10ch;
  background: ${({ status }) => {
    if (status === "selected") return "#d6dbf5"
    else if (status === "correct") return "#94d7a2"
    else if (status === "wrong") return "#f8bcbc"
    else return "transparent"
  }};
  ${({ status }) => status === "disabled" && "opacity:0.5;"}

  & > span {
    font-family: "Inter";
    font-size: 10.24px;

    padding: 10px;
  }
`

export default function Quiz({
  quiz,
  selectedOption,
  showResult,
  selectOption,
}) {
  const options = quiz.options.map((option, index) => {
    let status = ""
    if (showResult) {
      if (option === quiz.correct_answer) status = "correct"
      else {
        if (selectedOption !== quiz.correct_answer && selectedOption === option)
          status = "wrong"
        else status = "disabled"
      }
    } else {
      if (selectedOption === option) status = "selected"
    }

    return (
      <Option
        key={index}
        status={status}
        {...(!showResult && {
          onClick: () => selectOption(quiz.id, option),
        })}
      >
        <span>{option}</span>
      </Option>
    )
  })

  return (
    <>
      <Container>
        <Question>{quiz.question}</Question>
        <Options>{options}</Options>
      </Container>
      <hr />
    </>
  )
}
