## Cocktail app

_Name_
Aki Kurvinen

_Topic_
Web-application to find cocktail recipes.

- Search cocktails by name and display list of cocktails containing keyword
- Display cocktail image, ingredients and amounts by cocktail id
- Display glass type and instructions
- Use React Router to get cocktail id from URL bar
- Make responsive UI

_API_
TheCocktailDB
https://www.thecocktaildb.com/api.php

_Heroku link_
https://cocktail-app-pro.herokuapp.com/

_Video presentation_
https://youtu.be/cjp7-_56rbU

## Release 1: 2021-11-15 features

- Search cocktails by name (keyword)
- If only one match search criteria, display recipe immediately
- Else display list of drinks containing keyword as links
- Display cocktail image, recipe, name, glass type, ‘is alcoholic’ and instructions
- Navigation back to home or list view
- Responsive UI

## Release 2: 2021-11-29 features

- Prevent special characters in search box
- Display units in centiliters (cl)
- Include custom drinks JSON

## Routes

- / (Root, display main page)
- /{keyword} (Find drinks from API based on keyword and create list)
- /{keyword}/{id} (Display details of specific cocktail based on id and link back to home page)
- /{keyword}/{id}s (Same as above)
- /{keyword}/{id}m (Same as above + link back to list view)

## Components

- DrinkList (Get and display list of keyword matching cocktails from API)
- Recipe (Get and display single cocktail details by id from API)
- Home (Things only on home page)
- Header (Header logo)
- Footer (Footer credits)
- Recent (Not implemented list of user last searched drinks)
- Data (Not implemented storage for fetched json data in list view that could be utilized in Recipe view)

## Know bugs and defects

- Recipe does not utilize JSON already fetched in List view
- Custom drinks are not displayed among official drinks
- Only first keyword matching custom drink is displayed
