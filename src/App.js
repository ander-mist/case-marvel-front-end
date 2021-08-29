/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './modulos/login/Login';
import Register from './modulos/register/Register';
import User from './modulos/user/User';
import EditUser from './modulos/user/EditUser';
import ComicsPage from './modulos/user/ComicsPage';
// import CaractersPage from './modulos/user/CaractersPage';

function App() {
  const hasToken = () => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) return true;
    return false;
  };

  return (
    <Switch>
      <Route exact path="/">
        {hasToken() ? <Redirect to="/user/:id" /> : <Login />}
      </Route>
      <Route exact path="/register" component={Register} />
      <Route exact path="/user/:id" component={User} />
      <Route exact path="/user/edit/:id" component={EditUser} />
      <Route exact path="/user/edit/:id/characters" component={ComicsPage} />
      <Route exact path="/user/edit/:id/comics" component={ComicsPage} />
    </Switch>
  );
}

export default App;
