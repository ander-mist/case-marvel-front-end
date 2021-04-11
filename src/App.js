/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './modulos/login/Login';
import Register from './modulos/register/Register';
import User from './modulos/user/User';

function App() {
  const hasToken = () => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) return true;
    return false;
  };

  return (
    <Switch>
      <Route exact path="/">
        {hasToken() ? <Redirect to="/user" /> : <Login />}
      </Route>
      <Route exact path="/register" component={Register} />
      <Route exact path="/user" component={User} />
    </Switch>
  );
}

export default App;
