import React, {useState, useContext} from 'react'
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(true);

    const {theme, setTheme} = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
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