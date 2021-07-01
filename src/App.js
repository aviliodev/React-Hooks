
import React, {useState} from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './context/ThemeContext';
import '../src/styles/App.css';

function App() {
  //utilizamos un useState para manejar el comportamiento de la variable string "theme" con su respectiva función de cambio "setTheme"
  const [theme, setTheme] = useState('darkmode')

  return (
    //Mediante el ThemeContext que creamos previamente en la carpeta de context, nos permite crear un ThemeContextProvider, el cual, 
    //colocado aqui en App.js, nos permite enviar una o varias variables a todo nuestro sistema, para quien las quiera utilizar. 
    //En este caso mandamos el theme y la función setTheme del useState.

    //Al className del div principal de nuestra página le agregamos un "+ theme", de esa forma, cuando cambiemos el theme, también
    //cambiará el css asociado a ese classname (ver App.css)
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={'App ' + theme}>
          <Header/>
          <Characters/>
      </div>    
    </ThemeContext.Provider>

  );
}

export default App;
