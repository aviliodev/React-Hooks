import React, {useState, useContext} from 'react'
import ThemeContext from '../context/ThemeContext';
import '../assets/styles/components/Header.scss';
import logo from '../assets/statics/harry-potter-logo.png';

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
        // <div className="Header">
        //     <h1>Harry Potter API</h1>
        //     <button type="button" onClick={handleClick}> {darkMode ? 'Dark Mode' : 'Light Mode'}</button>
        // </div>

        <div className='Header'>
            <figure>
                <img src={logo} alt='Harry Potter API' />
            </figure>
            <input
                type='checkbox'
                id='checkbox'
                onChange={handleClick}
                checked={darkMode}
            />
            <label className='Header__switch' htmlFor='checkbox'></label>
        </div>
    )
};

export default Header;