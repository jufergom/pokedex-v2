import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/Home" component={Home}></Route>
        <Route path="/SignUp" component={SignUp}></Route>
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
