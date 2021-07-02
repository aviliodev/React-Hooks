import React, {useState, useEffect, useReducer} from 'react' //1
import '../styles/characters.css'

/* Super complicado pero lo vas a usar muchisimas veces




*/

    //2. Se crea un estado inicial: la lista de favoritos vacia el cual se usará con el useReducer
const initialState = {
    favorites: []
};

    // 3. crea el reducer, es una funcion que usa switch para identificar el metodo a usar
    // 	  recive state y action:
    // 		state: el estado actual.
    // 		action: objeto con el metodo que quieres ejecutar junto con el contenido.
    // 		action.type: el metodo a ejecutar.
    // 		action.payload: el contenido nuevo que quieres manejar.
    // 		Ej: ADD_TO_FAVORITE toma el estado actual y le agrega el contenido de payload

    // 		el segundo parametro es el estado inicial, que por lo regular es vacio
const favoriteReducer = (state, action) => { 
    switch(action.type) {
      case 'ADD_TO_FAVORITE':
        return {
          ...state, //estado original
          favorites: [...state.favorites, action.payload]
        };
        default: return state;
    }
  };

const Characters = () => {
    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un vector vacío
     */
const [characters, setCharacters] = useState([]);
    // 4. crea el use reducer:
    // 		favorite: es el nombre el valor de lectura.
    // 		dispatch: el nombre de la funcion para llamar a los metodos.
    // 		useReducer toma dos datos, el primero es el reducer, contenedor del switch de metodos
const [favorite, dispatch] = useReducer(favoriteReducer, initialState);

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

        // 5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
        // 	contiene el type que es el nombre del metodo
        // 	y el payload que es el contenido que se manejara al correr el metodo
        // 	el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
      }

    /** 
     * Nombre de la pelicula
     * Iteramos por cada uno de los elementos
     */
    return (
        <div className="Characters">

        {favorite.favorites.map((favorite) => ( //7 map al contenido de favorite, listado del contenido de este array, si no hay pues no se ve nada.
                <li class='item' key={favorite.id}>
                {favorite.name}
                </li>
        ))}

        {characters.map(hcharacter => ( //6. onclick, que manda a llamar al dispatch es un onclick que al ejecutarse manda la data del caracter en la funcion. Esta info será mandada al reducer y de ahi al state final en favorite.
            <div className="ficha">
                <div className="datos" key={hcharacter.id}>
                    <h1>{hcharacter.name}</h1>
                    <h2>Casa : {hcharacter.house}</h2>    
                </div>
                <img src={hcharacter.image} alt={hcharacter.name}></img>
                <button type="button" onClick={() => handleClick(hcharacter)}>Agregar a favoritos</button>   
            
            </div>
        
        ))}

        </div>
    );
};

export default Characters;