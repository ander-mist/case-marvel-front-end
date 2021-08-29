/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import api from '../../axios/index';
import mainContext from '../../context/Context';
import '../../css/userPage.css';

function User() {
  const { userInfo } = useContext(mainContext);
  const getFromLocalstorage = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(async () => {
    const newHash = await api.get('/marvel').then((res) => res).catch((err) => err);
    console.log('hash a ser gerada => ', newHash);
  }, []);
  return (
    <div>
      <Header info={userInfo} localStorage={getFromLocalstorage} />
      <div className="body-selection">
        <div className="body-background-1">
          <h1>
            <Link to={`/user/edit/${userInfo.id}/comics`}>Comics</Link>
          </h1>
        </div>
        <div className="body-background-2">
          <h1>
            <Link to={`/user/edit/${userInfo.id}/characters`}>Caracters</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default User;
