import React, { useState, useEffect } from "react";

//import testData from "./drink.json";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const customData = require("./customDrinks.json");
const singleDrink = require("./drink.json");
function Recipe() {
  let [drinkRecipe, setDrinkRecipe] = useState([]);
  const { id } = useParams();
  const { keyword } = useParams();
  const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  // make drink ingradients table
  const getIngredients = (drinksFound) => {
    let name = [];
    let amount = [];

    // API won't return ingredients in array format
    // so we have to convert keys and values to arrays

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
    });

    // start building html-table element
    let html = `<table class='ingtable'/>`;

    for (var i = 0; i < name.length; i++) {
      html += `<tr>`;
      html += `<td>`;

      // API returns ingredients in various units
      // so they will be converted to cl (centiliter)

      // ingredients that don't have unit:
      if (amount[i] === undefined) {
        html += " ";
      }
      // ingredients using oz-units :
      else if (amount[i].toLowerCase().includes(" oz")) {
        let match = null,
          frac = null,
          integers = null;
        match = amount[i].match(/^([\S]+)/gm); // get numbers
        frac = amount[i].match(/(?:[1-9][0-9]*|0)\/[1-9][0-9]*/gm); // get fractions
        integers = parseFloat(match) * 2.95735296; // covert oz to cl
        var result = 0;
        if (frac) {
          var a = frac.toString();
          var split = a.split("/");
          result = parseInt(split[0], 10) / parseInt(split[1], 10);
          result = result * 2.95735296;
        }
        integers += result;
        integers = Math.round(integers / 0.5) * 0.5;
        html += " " + integers;
        html += " cl";
      }
      // ingredients using ml-units :
      else if (amount[i].toLowerCase().includes(" ml")) {
        let match = amount[i].match(/^([\S]+)/gm);
        html += match / 10 + " cl";
      }
      // ingredients using unknown units:
      else {
        html += amount[i];
      }
      html += `</td><td>${name[i]}</td>`;
      html += `<tr>`;
    }

    html += "</table>";
    return html;
  };
  // find alcoholic / non alcoholic icon, else display 'no data'-icon
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
  // find glass icon based on 'glasstype', else return default icon
  function getGlassIcon(glasstype) {
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
    } else if (glass.includes("margarita")) {
      return "margarita";
    } else if (glass.includes("coupette")) {
      return "coupe";
    } else if (glass.includes("nick")) {
      return "nick-and-nora";
    } else if (glass.includes("balloon")) {
      return "balloon";
    } else if (glass.includes("parfait")) {
      return "parfait";
    } else if (glass.includes("cocktail")) {
      return "martini";
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
                  <div key="drink">
                    <img
                      className="drinkImg"
                      src={drink.strDrinkThumb + "/preview"}
                      alt={drink.strDrink}
                    />
                    <h2>
                      <i>{drink.strDrink}</i>
                    </h2>
                    <div className="drinkinfo">
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
          if (error.response) {
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    };
    if (keyword !== "") {
      //  Drink is custom
      if (window.location.href.indexOf("custom") > -1) {
        const customDrinkID = parseInt(window.location.href.split("/").pop());
        console.log("Custom...");

        // Remove other drinks from custom list to use getIngredients-function later
        let drinksFound = { drinks: [customData.drinks[customDrinkID]] };
        console.log(drinksFound);
        console.log(singleDrink);
        setDrinkRecipe(
          <div key={customData.drinks[customDrinkID].strDrink}>
            <img
              className="drinkImg"
              src={customData.drinks[customDrinkID].strDrinkThumb}
              alt={customData.drinks[customDrinkID].strDrink}
            />
            <h2>
              <i>{customData.drinks[customDrinkID].strDrink}</i>
            </h2>
            <div className="drinkinfo">
              <figure>
                <img
                  className="glassImg"
                  src={
                    "/images/glass/" +
                    getGlassIcon(
                      customData.drinks[customDrinkID].strGlass,
                      customData.drinks[customDrinkID].strDrink
                    ) +
                    ".png"
                  }
                  alt={customData.drinks[customDrinkID].strGlass}
                />
                <figcaption className="glassType">
                  {customData.drinks[customDrinkID].strGlass}
                </figcaption>
              </figure>
              <figure>
                <img
                  className="glassImg"
                  src={
                    "/images/glass/" +
                    getAlcIcon(customData.drinks[customDrinkID].strAlcoholic) +
                    ".png"
                  }
                  alt={customData.drinks[customDrinkID].strGlass}
                />
                <figcaption className="isAlcoholic">
                  {customData.drinks[customDrinkID].strAlcoholic}
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
            <p className="inst">
              {customData.drinks[customDrinkID].strInstructions}
            </p>
          </div>
        );
        //
      }
      //  Drink is not custom
      else {
        getDataFromAPI();
      }
    }
  }, [keyword, baseURL]);

  return (
    <div className="content">
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
