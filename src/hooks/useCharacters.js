import { useState, useEffect } from 'react';

const useCharacters = (url) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty (lo cambié a la api de Gibli)
    // fetch('https://rickandmortyapi.com/api/character/') //API DE RICK Y MORTY
    fetch('http://hp-api.herokuapp.com/api/characters/') //API DE HARRY POTTER
    .then(response => response.json())
    // .then(data => setCharacters(data.results)) //Para que funcione Api de Rick y Morty
    .then(data => setCharacters(data))
  }, [url]);
  return characters;
};

export default useCharacters;