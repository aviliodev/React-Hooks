import React, {useState, useEffect, useReducer, useMemo, useRef} from 'react'//1
import '../styles/characters.css'

    //useReducer 2. Se crea un estado inicial: la lista de favoritos vacia el cual se usará con el useReducer
const initialState = {
    favorites: []
};

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
    useEffect(() => {
        // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty (lo cambié a la api de Gibli)
        // fetch('https://rickandmortyapi.com/api/character/') //API DE RICK Y MORTY
        fetch('http://hp-api.herokuapp.com/api/characters/') //API DE HARRY POTTER
        .then(response => response.json())
        // .then(data => setCharacters(data.results)) //Para que funcione Api de Rick y Morty
        .then(data => setCharacters(data))
    },[]); // La variable que escuchará si hay cambios, en este caso no se usa y por eso se coloca un arreglo vacio.

        //useReducer 5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
        // 	contiene el type que es el nombre del metodo
        // 	y el payload que es el nuevo contenido que se agregará al correr el método, en este caso 'ADD_TO_FAVORITE'.
        // 	el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
      }

      //filtrar 2. Se creó handleSearch para manejar cuando el usuario escriba en el buscador, desencadene el setSearch, al cual se le manda le value del control de búsqueda.
    //   const handleSearch = event  => {
    //     setSearch(event.target.value)
    // }

      //useRef 2. mismo handleSearch de arriba, pero ahora se utiliza la variable creada con useRef "searchInput", la cual maneja directamente el event del botón Search
    const handleSearch = ()  => {
        setSearch(searchInput.current.value)
    }

        //filtrar 3. filteredUsers filtrará a characters (variable creada con useState que contiene a todos los personajes) y devolverá los personajes
        //  que incluyan (.include) las letras/palabras que estén en la variable search (creada con useState y contiene lo que escriban en el control Search)       
    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // })

        //esta nueva función filteredUsers hace lo mismo que la comentada arriba, pero utiliza useMemo para guardar los resultados ya buscados y asi no buscar todo nuevamente.
    const filteredUsers = useMemo( () => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    /** 
     * Nombre de la pelicula
     * Iteramos por cada uno de los elementos
     */
    return (
        <div className="Api">
            {favorite.favorites.map((favorite) => ( //useReducer 7. map al contenido de favorite, listado del contenido de este array, si no hay pues no se ve nada.
                    <li class='item' key={favorite.id}>
                        {favorite.name}
                    </li>
            ))}

            {/* filtrar 4. Control que ejecuta el handleSearch. se activa cuando alguien escribe en el control. */}
            <div className="Search">
                <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
            </div> 

            <div className="Characters">
                {/* filtrar 5. antes sacabamos los personajes directamente de "characters", ahora los sacamos de "filteredUsers", para solo mostrar los que indique el filtro. */}
                {filteredUsers.map(hcharacter => ( 
                <div className="Character">
                    <div className="ficha">
                        <div className="datos" key={hcharacter.id}>
                            <h1>{hcharacter.name}</h1>
                            <h2>Casa : {hcharacter.house}</h2>    
                        </div>
                        <img src={hcharacter.image} alt={hcharacter.name}></img>    
                    </div>
                    <div className="Acciones">
                    {/* useReducer 6. onclick, que manda a llamar al dispatch es un onclick que al ejecutarse manda la data del caracter en la funcion. Esta info será mandada al reducer y de ahi al state final en favorite. */}
                        <button type="button" onClick={() => handleClick(hcharacter)}>Agregar a favoritos</button>     
                    </div>                    
                </div>    


                ))}

            </div>
        </div>


    );
};

export default Characters;