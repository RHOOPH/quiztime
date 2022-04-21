import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <GlobalStyle />
    <App />
  </Router>
)
