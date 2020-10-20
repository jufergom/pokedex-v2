import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Pokedex from './components/Pokedex';

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/Pokedex" component={Pokedex}></Route>
      </Switch>
    </div>
  </BrowserRouter>
);

function App() {
  return (
    <div className="App">
      {routing}
    </div>
  );
}

export default App;
