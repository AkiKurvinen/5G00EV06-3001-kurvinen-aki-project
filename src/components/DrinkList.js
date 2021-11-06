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
        setDrinkRecipes("No drinks found");
      } else {
        setDrinkRecipes(
          drinksFound.drinks.map((drink) => {
            return (
              <Link key={drink.idDrink} to={`/${keyword}/${drink.idDrink}`}>
                <li key={drink.idDrink}>{drink.strDrink}</li>
              </Link>
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
    <div>
      {" "}
      <nav>
        <Link to="/">Back to home</Link>
      </nav>
      <main>{drinkRecipes}</main>
    </div>
  );
}

export default DrinkList;
