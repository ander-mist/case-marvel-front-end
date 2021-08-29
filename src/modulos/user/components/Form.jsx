import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../axios';

function Form(data) {
  const { data: { userName, userEmail } } = data;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userPass, setUserPass] = useState();
  const history = useHistory();

  const getId = (path) => {
    const newId = path.split('/');
    return newId[2];
  };

  const pathId = getId(history.location.pathname);

  const handleOnClick = async (event) => {
    event.preventDefault();
    const dataPost = { name, email, password: userPass };
    const edit = await api.post(`/user/${pathId}`, dataPost).then((response) => console.log(response.data)).catch((err) => err.response.data);
    history.push(`/user/${pathId}`);
    return edit;
  };

  useEffect(() => {
    // handleOnClick();
    setName(userName);
    setEmail(userEmail);
  }, []);
  console.log(typeof (name));
  console.log(typeof (email));
  console.log(typeof (userPass));
  console.log(typeof (pathId));

  function render() {
    return (
      <div className="container-sm">
        <form onSubmit={(e) => handleOnClick(e)} method="post">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
              <input
                type="text"
                id="name"
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
              <input
                type="text"
                id="email"
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
              <input
                type="password"
                id="password"
                placeholder="******"
                onChange={(e) => setUserPass(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-success">Edit</button>
        </form>
      </div>
    );
  }
  if (!name && !email) {
    return <p>carregando...</p>;
  }
  return render();
}

export default Form;
