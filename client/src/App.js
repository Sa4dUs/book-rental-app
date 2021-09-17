import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./style.css"

import Navbar from "./components/Navbar.js"
import BookList from "./components/BookList.js"
import LoginForm from "./components/LoginForm.js"
import SignupForm from "./components/SignupForm.js"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Switch>
          <Route exact path="/">
            <BookList />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
