/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../axios';
import mainContext from '../../context/Context';

function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { setUserInfo } = useContext(mainContext);

  const handleOnClick = async (event) => {
    event.preventDefault();
    const request = await api.post('/login', { email, password: pass })
      .then((response) => response.data).catch((err) => err.response.data);
    if (request.token) {
      localStorage.setItem('user', JSON.stringify({ token: request.token }));
      setUserInfo({
        id: request.id, name: request.name, email: request.email,
      });
      localStorage.setItem('currentUser', JSON.stringify({
        id: request.id, name: request.name, email: request.email,
      }));
      return history.push(`/user/${request.id}`);
    }
    return setErrorMessage(request);
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleOnClick} method="post">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="your password"
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
        </div>
        <p>{errorMessage}</p>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <Link to="/register">
          <button type="button" className="btn btn-secondary">Create an Account</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
