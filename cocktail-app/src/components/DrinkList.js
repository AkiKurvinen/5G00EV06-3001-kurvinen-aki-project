import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import testData from "./drinks.json";
function DrinkList() {
  let [drinkRecipes, setDrinkRecipes] = useState([]);

  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = async () => {
    /*
    axios.get(`${baseURL}`).then((res) => {
      const drinksFound = res.data;

      setDrinkRecipes(
        drinksFound.drinks.map((drink) => {
          return <li key={drink.strDrink}>{drink.strDrink}</li>;
        })
      );
    });

    */

    const drinksFound = testData;
    setDrinkRecipes(
      drinksFound.drinks.map((drink) => {
        return (
          <Link to={`/drink/${drink.idDrink}`}>
            <li key={drink.idDrink}>{drink.strDrink}</li>
          </Link>
        );
      })
    );

    console.log(testData);
  };

  return (
    <div>
      <ul>
        <Link to="/">
          <li>Drink 1</li>
        </Link>
        <Link to="/drink">
          <li>Drink 2</li>
        </Link>
        <p>{drinkRecipes}</p>
      </ul>
    </div>
  );
}

export default DrinkList;
