import styled from "styled-components"
import { animated, useSpring, useSprings } from "@react-spring/web"

const Container = styled(animated.div)`
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
const Option = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 13px 10px;
  text-align: center;
  border: 0.794239px solid #4d5b9e;
  border-radius: 7.94239px;
  cursor: pointer;
  min-width: 10ch;
  -webkit-tap-highlight-color: transparent;
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
  index,
}) {
  const spring = useSpring({
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 100 + index * 50,
  })
  const [colors, api] = useSprings(quiz.options.length, (item) => ({
    background: "transparent",
    opacity: 1,
  }))
  const options = quiz.options.map((option, index) => {
    if (showResult) {
      if (option === quiz.correct_answer)
        api.start((i) => {
          if (i === index) return { background: "#94d7a2" }
        })
      else {
        if (selectedOption !== quiz.correct_answer && selectedOption === option)
          api.start((i) => {
            if (i === index) return { background: "#f8bcbc" }
          })
        else
          api.start((i) => {
            if (i === index) return { opacity: 0.5 }
          })
      }
    } else {
      if (selectedOption === option)
        api.start((i) => {
          if (i === index) return { background: "#d6dbf5" }
          else return { background: "transparent" }
        })
    }

    return (
      <Option
        key={index}
        style={colors[index]}
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
      <Container style={spring}>
        <Question>{quiz.question}</Question>
        <Options>{options}</Options>
      </Container>
      <hr />
    </>
  )
}
