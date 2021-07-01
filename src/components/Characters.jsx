import React, {useState, useEffect, useReducer} from 'react' //1
import '../styles/characters.css'

/* Super complicado pero lo vas a usar muchisimas veces
1. agrega el useReducer
2. crea un estado inicial: la lista de favoritos vacia
3. crea el reducer, es una funcion que usa switch para identificar el metodo a usar
	  recive state y action:
		state: el estado actual.
		action: objeto con el metodo que quieres ejecutar junto con el contenido.
		action.type: el metodo a ejecutar.
		action.payload: el contenido nuevo que quieres manejar.
		Ej: ADD_TO_FAVORITE toma el estado actual y le agrega el contenido de payload
4. crea el use reducer:
		favorite: es el nombre el valor de lectura.
		dispatch: el nombre de la funcion para llamar a los metodos.
		useReducer toma dos datos, el primero es el reducer, contenedor del switch de metodos
		el segundo parametro es el estado inicial, que por lo regular es vacio
5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
		contiene el type que es el nombre del metodo
		y el payload que es el contenido que se manejara al correr el metodo
		el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
6. Onclick que manda a llamar al dispatch
		es un onclick que al ejecutarse manda la data del caracter
		en la funcion esta info sera mandada al reducer y de ahi al state final en favorite
7. map al contenido de favorite, listado del contenido de este array, 
		si no hay pues no se ve nada
*/

//2. Crear un estado inicial. el cual se usará con el useReducer
const initialState = {
    favorites: []
};

//3. Crear el reducer.
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