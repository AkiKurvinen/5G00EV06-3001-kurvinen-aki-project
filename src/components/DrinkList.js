import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import testData from "./drinks.json";
import { useParams } from "react-router-dom";
function DrinkList() {
  const { keyword } = useParams();
  let [drinkRecipes, setDrinkRecipes] = useState([]);
  //  let [keyword, setKeyword] = useState(keyword);

  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`;

  useEffect(() => {
    getDataFromAPI();
  });

  let drinksFound = "";
  const getDataFromAPI = async () => {
    axios.get(`${baseURL}`).then((res) => {
      drinksFound = res.data;
      if (res.data.drinks == null) {
        setDrinkRecipes(`No drinks found for "${keyword}"`);
      } else {
        setDrinkRecipes(
          drinksFound.drinks.map((drink) => {
            return (
              <li key={drink.idDrink}>
                <Link key={drink.idDrink} to={`/${keyword}/${drink.idDrink}`}>
                  {drink.strDrink}
                </Link>
              </li>
            );
          })
        );
      }

      /*
    const drinksFound = testData;
      */
    });

    // console.log(testData);
  };

  return (
    <div class="drinklist">
      <nav>
        <Link to="/">Back to home</Link>
      </nav>
      <main>
        {" "}
        <ul>{drinkRecipes} </ul>
      </main>
    </div>
  );
}

export default DrinkList;
