import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/Search.scss';

 const Search = ({search, searchInput, handleSearch}) => {

//     return(
//         <div className="Search">
//             <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
//         </div> 
//     )
// }

    return (
        <div className='Search'>
        <input
            type='text'
            placeholder='Type the character name...'
            value={search}
            ref={searchInput}
            onChange={handleSearch}
        />
        <FontAwesomeIcon icon={faSearch} />
        </div>
    );
    };

export default Search