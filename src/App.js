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
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
