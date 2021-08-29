import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../../images/novo-logo-marvel.png';
import '../../../css/headerUser.css';

function Header({ info, localStorage }) {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(`/user/edit/${info.id}`);
  };

  return (
    <div className="border-size">
      <img src={Logo} alt="logo-marvel" width="200px" />
      <nav>
        <p>{`Bem-Vindo ${info.name || localStorage.name}`}</p>
        <p>{info.email || localStorage.email}</p>
      </nav>
      <button className="header-button" type="button" onClick={handleOnClick}>Editar Perfil</button>
    </div>
  );
}

export default Header;

Header.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  localStorage: PropTypes.objectOf(PropTypes.string).isRequired,
};
