
import React, {useState} from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import '../src/styles/App.css';

function App() {

  const [theme, setTheme] = useState('lightmode')

  return (
    <div className={'App ' + theme}>
      <Header/>
      <Characters/>
      <h1>Hola Mundo</h1>
    </div>
  );
}

export default App;
