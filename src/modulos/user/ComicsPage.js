/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import axios from 'axios';
import mainContext from '../../context/Context';
import Cards from './components/Cards';
import Header from './components/Header';
import Footer from './components/Footer';
import '../../css/cards.css';

function ComicsPage() {
  const [comics, setComics] = useState();
  const [offset, setOffset] = useState(0);
  const [isDesable, setIsDesable] = useState(true);
  const { userInfo } = useContext(mainContext);
  const history = useHistory();
  const getFromLocalstorage = JSON.parse(localStorage.getItem('currentUser'));
  const timestamp = new Date().getTime().toString();
  const hash = md5(
    timestamp + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY,
  );

  const getLocation = () => {
    const route = history.location.pathname;
    const currentPage = route.split('/');
    return currentPage[4];
  };
  const page = getLocation();
  const url = `https://gateway.marvel.com/v1/public/${page}?limit=20&offset=${offset}&ts=${timestamp}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

  const getComics = async () => {
    console.log(hash);
    console.log(timestamp);
    await axios.get(url).then((res) => setComics(res.data)).catch((err) => setComics(err));
  };

  const onClickFunction = (e) => {
    if (e.target.value === 'mais') setOffset(offset + 20);
    if (e.target.value === 'menos') setOffset(offset - 20);
  };

  useEffect(() => {
    getComics();
  }, []);

  useEffect(() => {
    setIsDesable(offset === 0);
    getComics();
  }, [offset]);

  console.log(process.env.REACT_APP_PRIVATE_KEY);
  console.log(process.env.REACT_APP_PUBLIC_KEY);
  console.log(getLocation());

  if (!comics) {
    return <p>carregando...</p>;
  }

  return (
    <div className="container">
      <section className="header">
        <Header info={userInfo} localStorage={getFromLocalstorage} />
      </section>
      <h1 className="title">{page}</h1>
      <div className="main-box">
        {console.log(comics)}
        {comics.data.results.map((comic) => (
          <Cards key={comic.id} comicData={comic} />
        ))}
        <section className="button-prev-next">
          <button
            type="button"
            value="menos"
            disabled={isDesable}
            onClick={(e) => onClickFunction(e)}
          >
            {'<< previous'}
          </button>
          <button
            type="button"
            value="mais"
            onClick={(e) => onClickFunction(e)}
          >
            {'Next >>'}
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ComicsPage;
