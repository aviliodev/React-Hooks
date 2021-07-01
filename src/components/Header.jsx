import React, {useState, useContext} from 'react'
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(true);

    const {theme, setTheme} = useContext(ThemeContext);

    const handleClick = () => {
        //cada vez que se active el handleClick, la función setDarMode seteará a darkMode a true o false
        setDarkMode(!darkMode);
        //tambien tomamos el theme que provee el useContext (viene desde App.js), y lo cambiamos con setTheme
        theme === 'darkmode' ? setTheme('lightmode') : setTheme('darkmode');
    }
    return (
        <div className="Header">
            <h1>Harry Potter API</h1>
            <button type="button" onClick={handleClick}> {darkMode ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
    )
};

export default Header;