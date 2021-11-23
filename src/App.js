import Recipe from "./components/Recipe.js";
import Home from "./components/Home.js";
import DrinkList from "./components/DrinkList.js";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: `url("../images/left-drink.jpg"), url("../images/right-drink.jpg")`,
        }}
      >
        <Header />
        <div className="Container">
          <Search />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:keyword" exact component={DrinkList} />
            <Route path="/:keyword/:id" component={Recipe} />
          </Switch>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
