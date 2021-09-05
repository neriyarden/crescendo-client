import React from 'react'
import SearchBar from '../../../../components/General/Inputs/SearchBar/SearchBar'
import CharsSearchBar from '../../../../components/General/Inputs/CharsSearchBar/CharsSearchBar'


const ArtistSearchBar = ({ searchFilters, setSearchFilters }) => {

    const onValueUpdate = (key) => (value) => {
        setSearchFilters({ ...searchFilters, [key]: value })
    }

    return (
        <div className='browse-artists-search'>
            <SearchBar
                isCollapsable={false}
                labelValue='Artist'
                searchOnChange={onValueUpdate('searchTerm')}
            />
            <CharsSearchBar onCharSelect={onValueUpdate('startsWith')} />
        </div>
    )
}

export default ArtistSearchBar
