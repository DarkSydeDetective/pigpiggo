import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import "./App.css";
import Search from "./pages/search/Search";
import About from "./pages/about/About";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="about-link">
          <NavLink activeClassName="link-active" to="/about">
            About
          </NavLink>
          <NavLink activeClassName="link-active" exact to="/">
            Home
          </NavLink>
        </div>
        <header className="App-header">
          <Link className="App-link" to="/">
            <h1>
              <i className="fas fa-piggy-bank"></i> <span>Pig</span>
              <span>Pig</span>
              <strong>Go</strong>
            </h1>
          </Link>
          <span>The most toxified search engine on the internet</span>
        </header>
        <div className="main-content">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Search />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
