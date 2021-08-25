import React from 'react'
import SearchBar from '../../../components/General/Inputs/SearchBar/SearchBar'
import CharsSearchBar from '../../../components/General/Inputs/CharsSearchBar/CharsSearchBar'


function ArtistSearchBar({ searchFilters, setSearchFilters }) {

    const searchOnChange = (value) => {
        setSearchFilters({...searchFilters, searchTerm: value})
    }
    const onCharSelect = (value) => {
        setSearchFilters({...searchFilters, startsWith: value})
    }
    
    return (
        <div className='browse-artists-search'>
            <SearchBar collapsable={false} labelValue='Artist' searchOnChange={searchOnChange}/>
            <CharsSearchBar onCharSelect={onCharSelect}/>
        </div>
    )
}

export default ArtistSearchBar
