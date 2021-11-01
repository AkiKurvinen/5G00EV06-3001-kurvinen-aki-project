import React, { useState, useEffect } from "react";
import testData from "./drink.json";
import axios from "axios";
import { useParams } from "react-router-dom";

function Recipe() {
  let [drinkRecipe, setDrinkRecipe] = useState([]);
  const { id } = useParams();
  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getIngredients = (drinksFound) => {
    let name = [];
    let amount = [];

    drinksFound.drinks.forEach((drink) => {
      const drinkEntries = Object.entries(drink),
        [ingredientsArray, measuresArray] = ["strIngredient", "strMeasure"].map(
          (keyName) =>
            drinkEntries
              .filter(
                ([key, value]) =>
                  key.startsWith(keyName) && value && value.trim()
              )
              .map(([key, value]) => value)
        );

      name = ingredientsArray;
      amount = measuresArray;

      // console.log("Ingredients:", ingredientsArray);
      // console.log("Measures:", measuresArray);
    });

    let html = "<table class='ingtable'>";

    for (var i = 0; i < name.length; i++) {
      html += "<tr>";
      html += `<td>${amount[i]}</td><td>${name[i]}</td>`;
      html += "<tr>";
    }

    html += "</table>";
    return html;
  };

  const getDataFromAPI = async () => {
    axios.get(`${baseURL}`).then((res) => {
      const drinksFound = res.data;

      //const drinksFound = testData; // for testing

      if (drinksFound === "" || drinksFound.drinks == null) {
        setDrinkRecipe(
          <div>
            <h2>No drink found</h2>
          </div>
        );
      } else {
        setDrinkRecipe(
          drinksFound.drinks.map((drink) => {
            return (
              <div>
                <h2>
                  <i>{drink.strDrink}</i>
                </h2>
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getIngredients(drinksFound),
                    }}
                  />
                }
              </div>
            );
          })
        );
      }
    });

    /*
     */
  };

  return <div>{drinkRecipe}</div>;
}

export default Recipe;
