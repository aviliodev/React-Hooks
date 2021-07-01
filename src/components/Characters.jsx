import React, {useState, useEffect} from 'react'
import '../styles/characters.css'

const Characters = () => {
    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un vector vacío
     */
    const [characters, setCharacters] = useState([]);
    /**
     * Lógica de useEffect
     * es una función con 2 parámetros
     * el primero es una función anónima donde va a estar la lógica
     * el segundo es una variable que esta escuchando si hay cambios.
     */
    useEffect(() => {
        // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty (lo cambié a la api de Gibli)
        // fetch('https://rickandmortyapi.com/api/character/') //API DE RICK Y MORTY
        fetch('http://hp-api.herokuapp.com/api/characters/')
        .then(response => response.json())
        // .then(data => setCharacters(data.results)) //Para que funcione Api de Rick y Morty
        .then(data => setCharacters(data))
    },[]); // La variable que escuchará si hay cambios, en este caso no se usa y por eso se coloca un arreglo vacio.

    /** 
     * Nombre de la pelicula
     * Iteramos por cada uno de los elementos
     */
    return (
        <div className="Characters">
            {characters.map(hcharacter => (
                <div className="ficha">
                    <div className="datos">
                        <h1>{hcharacter.name}</h1>
                        <h2>Casa : {hcharacter.house}</h2>    
                    </div>
                    <img src={hcharacter.image} alt={hcharacter.name}></img>  
               
                </div>
            
            ))}

        </div>
    );
};

export default Characters;