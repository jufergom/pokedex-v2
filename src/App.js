import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home'

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/Home" component={Home}></Route>
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
