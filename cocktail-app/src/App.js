import React from "react";
import Recipe from "./components/Recipe.js";
import Main from "./components/Main.js";
import DrinkList from "./components/DrinkList.js";
import Search from "./components/Search.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/drink" exact component={DrinkList} />
          <Route path="/drink/:id" component={Recipe} />
        </Switch>
        <Search />
      </div>
    </Router>
  );
}

export default App;
