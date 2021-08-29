/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'proptypes';
import mainContext from './Context';

function Provider({ children }) {
  const [userInfo, setUserInfo] = useState('');

  const value = {
    userInfo,
    setUserInfo,
  };

  return (
    <mainContext.Provider value={value}>
      {children}
    </mainContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
