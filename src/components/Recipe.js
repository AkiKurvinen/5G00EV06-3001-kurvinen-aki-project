import React, { useState, useEffect } from "react";
//import testData from "./drink.json";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Recipe() {
  let [drinkRecipe, setDrinkRecipe] = useState([]);
  const { id } = useParams();
  const { keyword } = useParams();
  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

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
    console.log("Measures:", amount);
    let html = `<table class='ingtable'/>`;

    for (var i = 0; i < name.length; i++) {
      html += `<tr>`;
      // html += `<td>${amount[i]}</td><td>${name[i]}</td>`;
      html += `<td>${amount[i] === undefined ? " " : amount[i]}</td><td>${
        name[i]
      }</td>`;
      html += `<tr>`;
    }

    html += "</table>";
    return html;
  };
  function getAlcIcon(isAlcoholic) {
    let alc = isAlcoholic.toLowerCase();
    if (alc.includes("non")) {
      return "zero";
    } else if (alc.includes("alcoholic")) {
      return "alcoholic";
    } else {
      return "nodata";
    }
  }
  function getGlassIcon(glasstype, drinkName) {
    let glass = glasstype.toLowerCase();

    if (glass.includes("mug")) {
      return "mug";
    } else if (glass.includes("whiskey")) {
      return "whiskey";
    } else if (glass.includes("white wine")) {
      return "white-wine";
    } else if (glass.includes("red wine")) {
      return "red-wine";
    } else if (glass.includes("old-fashioned")) {
      return "whiskey";
    } else if (glass.includes("jar")) {
      return "jar";
    } else if (glass.includes("flute")) {
      return "flute";
    } else if (glass.includes("collins")) {
      return "hiball";
    } else if (glass.includes("highball")) {
      return "hiball";
    } else if (glass.includes("beer")) {
      return "beer";
    } else if (glass.includes("shot")) {
      return "shot";
    } else if (glass.includes("pitcher")) {
      return "pitcher";
    } else if (glass.includes("whiskey sour")) {
      return "whisky-sour-glass";
    } else if (glass.includes("coupette")) {
      return "coupe";
    } else if (glass.includes("margarita")) {
      return "margarita";
    } else if (glass.includes("nick")) {
      return "nick-and-nora";
    } else if (glass.includes("balloon")) {
      return "balloon";
    } else if (glass.includes("parfait")) {
      return "parfait";
    } else if (glass.includes("cocktail")) {
      return drinkName.toLowerCase().includes("margarita")
        ? "margarita"
        : "martini";
    } else {
      return "noicon";
    }
  }

  useEffect(() => {
    const getDataFromAPI = async () => {
      console.log("getDataFromAPI");
      axios
        .get(`${baseURL}`)
        .then((res) => {
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
                    <img
                      className="drinkImg"
                      src={drink.strDrinkThumb + "/preview"}
                      alt={drink.strDrink}
                    />
                    <h2>
                      <i>{drink.strDrink}</i>
                    </h2>
                    <div class="drinkinfo">
                      <figure>
                        <img
                          className="glassImg"
                          src={
                            "/images/glass/" +
                            getGlassIcon(drink.strGlass, drink.strDrink) +
                            ".png"
                          }
                          alt={drink.strGlass}
                        />
                        <figcaption className="glassType">
                          {drink.strGlass}
                        </figcaption>
                      </figure>
                      <figure>
                        <img
                          className="glassImg"
                          src={
                            "/images/glass/" +
                            getAlcIcon(drink.strAlcoholic) +
                            ".png"
                          }
                          alt={drink.strGlass}
                        />
                        <figcaption className="isAlcoholic">
                          {drink.strAlcoholic}
                        </figcaption>
                      </figure>
                    </div>
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getIngredients(drinksFound),
                        }}
                      />
                    }
                    <p className="inst">{drink.strInstructions}</p>
                  </div>
                );
              })
            );
          }
        })
        .catch((error) => {
          // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });

      console.log("haku");
    };
    if (keyword !== "") {
      getDataFromAPI();
    }
  }, [keyword, baseURL]);

  return (
    <div class="content">
      {" "}
      <nav>
        <Link to="/" key="home">
          Back to home
        </Link>
        <Link to={{ pathname: `/${keyword}` }} key="back">
          Back to list
        </Link>
      </nav>
      <main>{drinkRecipe}</main>
    </div>
  );
}

export default Recipe;
