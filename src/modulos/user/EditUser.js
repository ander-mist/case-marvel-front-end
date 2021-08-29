/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import api from '../../axios';
import mainContext from '../../context/Context';
import Form from './components/Form';

function EditUser() {
  const { userInfo } = useContext(mainContext);
  const getFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
  const [info, setInfo] = useState(false);
  useEffect(async () => {
    const [userData] = await api.get(`/user/${userInfo.id}`)
      .then((response) => response.data).catch((err) => err.response.data);
    setInfo({ userName: userData.name, userEmail: userData.email });
    console.log(userInfo);
    console.log(getFromLocalStorage);
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <Form data={info} />
  );
}

export default EditUser;
