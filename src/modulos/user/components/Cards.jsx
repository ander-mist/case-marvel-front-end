import React, { useState, useEffect } from 'react';
import '../../../css/cards.css';

function Cards(comicData) {
  const {
    comicData: {
      title, thumbnail, description, name,
    },
  } = comicData;
  const imageURL = `${thumbnail.path}.${thumbnail.extension}`;
  const [getDescription, setGetDescription] = useState();
  const [listenClick, setlistenClick] = useState(false);
  console.log(description);

  const showDescription = () => {
    setlistenClick(!listenClick);
  };
  const noDescription = 'No Description';

  useEffect(() => {
    if (listenClick) setGetDescription(description || noDescription);
    if (!listenClick) setGetDescription('');
  }, [listenClick]);

  return (
    <div className="card">
      <div className="text-description">
        <p>
          {getDescription}
        </p>
      </div>
      <h6 className="title-card">{title || name}</h6>
      <img src={imageURL} alt="imagem da comic" />
      <button type="button" onClick={showDescription}> Description </button>
    </div>
  );
}

export default Cards;
