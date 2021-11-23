import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const customData = require("./customDrinks.json");
function DrinkList() {
  const { keyword } = useParams();
  let [drinkRecipes, setDrinkRecipes] = useState([]);
  let [isCustom, setIscustom] = useState("");
  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`;

  useEffect(() => {
    const getDataFromAPI = async () => {
      axios.get(`${baseURL}`).then((res) => {
        const drinksFound = res.data;
        if (res.data.drinks == null) {
          setDrinkRecipes(`No drinks found for "${keyword}"`);
        } else if (drinksFound.drinks.length === 1) {
          // Only one drink matched the criteria
          window.location.href = `/${keyword}/${drinksFound.drinks[0].idDrink}s`;
        } else {
          // Multiple drinks matched the criteria
          setDrinkRecipes(
            drinksFound.drinks.map((drink) => {
              return (
                <li key={drink.idDrink}>
                  <Link
                    to={{
                      pathname: `/${keyword}/${drink.idDrink}m`,
                    }}
                  >
                    {drink.strDrink}
                  </Link>
                </li>
              );
            })
          );
        }
      });
    };

    // if drink is custom, go to recipe
    var keys;
    for (keys = 0; keys < customData.drinks.length; keys++) {
      if (customData.drinks[keys].strDrink.toLowerCase() === keyword) {
        window.location.href = `/custom/${customData.drinks[keys].idDrink}`;
        break;
      }
    }

    // drink is not custom, find it using API
    if (window.location.href.indexOf("custom") === -1) {
      getDataFromAPI();
    }

    // display list of all custom drinks
    else {
      setIscustom("*Drinks from custom list");
      setDrinkRecipes(
        customData.drinks.map((drink) => {
          return (
            <li key={drink.idDrink}>
              <Link
                to={{
                  pathname: `/${keyword}/${drink.idDrink}`,
                }}
              >
                {drink.strDrink}*
              </Link>
            </li>
          );
        })
      );
    }
  }, [baseURL, keyword]);
  return (
    <div className="drinklist">
      {" "}
      <main>
        <ul>{drinkRecipes}</ul>
        <small>{isCustom}</small>
      </main>
    </div>
  );
}

export default DrinkList;
