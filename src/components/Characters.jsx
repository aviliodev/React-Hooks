import React, {useState, useReducer, useMemo, useRef, useCallback} from 'react'// ya no es necesario traer useEffect, porque ahora lo usamos en un hook personalizado llamado useCharacters
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/Characters.scss';

    //useReducer 2. Se crea un estado inicial: la lista de favoritos vacia el cual se usará con el useReducer
const initialState = {
    favorites: []
};

const API = 'http://hp-api.herokuapp.com/api/characters/'

    //useReducer 3. crea el reducer, es una funcion que usa switch para identificar el metodo a usar
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
          favorites: [...state.favorites, action.payload] // a la variable favorites de state, le agregaremos un nuevo elemento, sacado del action.payload (que viene del dispatch)
        };

        case 'REMOVE_FAVORITE':

            const favoriteIndex = state.favorites.findIndex(
              (favorite) => favorite.name === action.payload.name
            );
            const newFavorites = [...state.favorites];
            newFavorites.splice(favoriteIndex, 1);
            return {
              ...state,
              favorites: newFavorites,
            };
        
        default: return state;
    }
  };

const Characters = () => {
    const characters2 = useCharacters(API);  

    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un vector vacío
     */

    //Ya no se usa este useState, ahora la variable characters es controlada mendiante el hook personalizado useCharacters.
// const [characters, setCharacters] = useState([]);

    //useReducer 4. crea el use reducer:
    // 		favorite: es el nombre el valor de lectura.
    // 		dispatch: el nombre de la funcion para llamar a los metodos.
    // 		useReducer toma dos datos, el primero es el reducer, contenedor del switch de metodos
    const [favorite, dispatch] = useReducer(favoriteReducer, initialState);

    const [search, setSearch] = useState('');//filtrar 1. Se crea una variable vacia con el useState, que servirá para filtrar los personajes.

    const searchInput = useRef(null); //useRef 1. variable creada con useRef. Se usa para colocar dentro el "ref" del control al que sea asignada.

    /**
     * Lógica de useEffect
     * es una función con 2 parámetros
     * el primero es una función anónima donde va a estar la lógica
     * el segundo es una variable que esta escuchando si hay cambios.
     */
    /*
    useEffect(() => {
        // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty (lo cambié a la api de Gibli)
        // fetch('https://rickandmortyapi.com/api/character/') //API DE RICK Y MORTY
        fetch('http://hp-api.herokuapp.com/api/characters/') //API DE HARRY POTTER
        .then(response => response.json())
        // .then(data => setCharacters(data.results)) //Para que funcione Api de Rick y Morty
        .then(data => setCharacters(data))
    },[]); // La variable que escuchará si hay cambios, en este caso no se usa y por eso se coloca un arreglo vacio.
    */



        //useReducer 5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
        // 	contiene el type que es el nombre del metodo
        // 	y el payload que es el nuevo contenido que se agregará al correr el método, en este caso 'ADD_TO_FAVORITE'.
        // 	el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
      }

      const handleFavorite = (character) => {
        const findFavorite = favorite.favorites.filter(
          (favorite) => favorite.name === character.name
        );

        if (!findFavorite.length) {
          dispatch({ type: 'ADD_TO_FAVORITE', payload: character });
        } else {
          dispatch({ type: 'REMOVE_FAVORITE', payload: character });
        }
      };    

      //filtrar 2. Se creó handleSearch para manejar cuando el usuario escriba en el buscador, desencadene el setSearch, al cual se le manda le value del control de búsqueda.
    //   const handleSearch = event  => {
    //     setSearch(event.target.value)
    // }

      //useRef 2. mismo handleSearch de arriba, pero ahora se utiliza la variable creada con useRef "searchInput", la cual maneja directamente el event del botón Search
    // const handleSearch = ()  => {
    //     setSearch(searchInput.current.value)
    // }

      //useCallback 1. se modificó handleSearch para hacer uso de useCallback
      const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
      }, []
      )

        //filtrar 3. filteredUsers filtrará a characters (variable creada con useState que contiene a todos los personajes) y devolverá los personajes
        //  que incluyan (.include) las letras/palabras que estén en la variable search (creada con useState y contiene lo que escriban en el control Search)       
    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // })

        //esta nueva función filteredUsers hace lo mismo que la comentada arriba, pero utiliza useMemo para guardar los resultados ya buscados y asi no buscar todo nuevamente.
    const filteredUsers = useMemo( () => 
        characters2.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters2, search]
    )

    /** 
     * Nombre de la pelicula
     * Iteramos por cada uno de los elementos
     */
    return (
        <div className="Characters">


            {favorite.favorites.length ? ( //useReducer 7. map al contenido de favorite, listado del contenido de este array, si no hay pues no se ve nada.
              <div className='Characters__container'>
                <h2>Favorite characters</h2>
                <div className='Characters__list Characters__list--favorites'>
                  {favorite.favorites.map((favorite) => (
                    <figure key={favorite.id}>
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        title={favorite.name}
                      />
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}            
            <div className='Characters__container'>
              {/* filtrar 4. Control que ejecuta el handleSearch. se activa cuando alguien escribe en el control. */}
              {/* <div className="Search">
                      <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
                  </div>  */}

              {/* Ahora el control Search se colocó en un componente aparte. */}
              <Search search ={search} searchInput={searchInput} handleSearch={handleSearch} />

              <div className='Characters__list'>
                {/* filtrar 5. antes sacabamos los personajes directamente de "characters", ahora los sacamos de "filteredUsers", para solo mostrar los que indique el filtro. */}
                {filteredUsers.map((hcharacter) => (
                  <div className='Character' key={hcharacter.id}>
                    <h3>{hcharacter.name}</h3>
                    <figure>
                      <img src={hcharacter.image} alt={hcharacter.name} />
                      {/* useReducer 6. onclick, que manda a llamar al dispatch es un onclick que al ejecutarse manda la data del caracter en la funcion. Esta info será mandada al reducer y de ahi al state final en favorite. */}
                      <button
                        className='btn'
                        type='button'
                        onClick={() => handleFavorite(hcharacter)}
                      >
                        <FontAwesomeIcon
                          className={`icon--favorite ${
                            favorite.favorites.filter(
                              (favorite) => favorite.name === hcharacter.name
                            ).length
                              ? 'favorite'
                              : ''
                          }`}
                          icon={faStar}
                        />
                      </button>
                    </figure>
                    <div className='Character__info'>
                      <span>{hcharacter.house}</span>
                      <span>{hcharacter.species}</span>
                      <span>{hcharacter.ancestry}</span>
                    </div>
                  </div>
                ))}
              </div>  
            </div>
          
        </div>


    );
};

export default Characters;