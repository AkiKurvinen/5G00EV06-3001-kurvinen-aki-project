import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const customData = require("./customDrinks.json");
function DrinkList() {
  const { keyword } = useParams();
  let [drinkRecipes, setDrinkRecipes] = useState([]);
  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`;

  useEffect(() => {
    const getDataFromAPI = async () => {
      axios.get(`${baseURL}`).then((res) => {
        const drinksFound = res.data;
        if (res.data.drinks == null) {
          setDrinkRecipes(`No drinks found for "${keyword}"`);
        } else if (drinksFound.drinks.length === 1) {
          window.location.href = `/${keyword}/${drinksFound.drinks[0].idDrink}`;
        } else {
          setDrinkRecipes(
            drinksFound.drinks.map((drink) => {
              return (
                <li key={drink.idDrink}>
                  <Link
                    to={{
                      pathname: `/${keyword}/${drink.idDrink}`,
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

    //
    var keys;
    for (keys = 0; keys < customData.drinks.length; ++keys) {
      console.log(customData.drinks[keys].strDrink);
      if (customData.drinks[keys].strDrink === keyword) {
        console.log("found custom drink");
        // window.location.href = `/${keyword}/${customData.drinks[keys].idDrink}`;
        window.location.href = `/custom/${customData.drinks[keys].idDrink}`;
      } else {
        getDataFromAPI();
        console.log("[DrinkList] getDataFromAPI");
      }
    }
    //
  }, [baseURL, keyword]);
  return (
    <div className="drinklist">
      {" "}
      <main>
        {" "}
        <ul>{drinkRecipes} </ul>
      </main>
    </div>
  );
}

export default DrinkList;
