import styled from "styled-components"
import Intro from "./Intro"
import { Routes, Route, Outlet } from "react-router-dom"
import Play from "./Play"

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  min-height: 100vh;
`

export default function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/play" element={<Play />} />
      </Routes>
      <Outlet />
    </Container>
  )
}
