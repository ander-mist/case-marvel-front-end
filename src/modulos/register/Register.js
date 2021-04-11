/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../axios';

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [nameInvalid, setNameInvalid] = useState('form-control');
  const [emailInvalid, setEmailInvalid] = useState('form-control');
  const [passInvalid, setPassInvalid] = useState('form-control');
  const history = useHistory();

  const validate = (register) => {
    switch (true) {
      case !name:
        return setNameInvalid('form-control is-invalid');
      case !email:
        return setEmailInvalid('form-control is-invalid');
      case !pass:
        return setPassInvalid('form-control is-invalid');
      case register === 'Email already exist':
        return setEmailInvalid('form-control is-invalid');
      default:
        return 'form-control';
    }
  };
  const handleOnClick = async (event) => {
    event.preventDefault();
    const register = await api.post('/register', { name, email, password: pass })
      .then((response) => response.data).catch((err) => err.response.data);
    if (!register.token) {
      validate(register);
      setErrorMessage(register);
      return setAlert('alert alert-danger');
    }
    localStorage.setItem('user', JSON.stringify(register));
    return history.push('/user');
  };

  useEffect(() => {
    if (name) setNameInvalid('form-control');
    if (email) setEmailInvalid('form-control');
    if (pass) setPassInvalid('form-control');
  }, [name, email, pass]);

  return (
    <div className="container-sm">
      <form onSubmit={handleOnClick} method="post">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
            <input
              type="text"
              className={nameInvalid}
              id="name"
              placeholder="your name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
            <input
              type="text"
              className={emailInvalid}
              id="email"
              placeholder="your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              type="password"
              className={passInvalid}
              id="password"
              placeholder="your password"
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          <div className={alert} role="alert">
            {errorMessage}
          </div>
        </div>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
