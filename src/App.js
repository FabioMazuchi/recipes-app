import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MyProvider from './MyContext/MyProvider';
import Foods from './Pages/Foods';
import FoodRecipe from './Pages/FoodRecipe';
import Drinks from './Pages/Drinks';
import DrinkRecipe from './Pages/DrinkRecipe';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFoodsIngredients from './Pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './Pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './Pages/ExploreFoodsNationalities';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DrinksInProgress from './Pages/DrinksInProgress';
import FoodsInProgress from './Pages/FoodsInProgress';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id" component={ FoodRecipe } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinkRecipe } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route
            exact
            path="/explore/drinks/nationalities"
            component={ NotFound }
          />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
