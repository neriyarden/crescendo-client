import React from 'react'
import SearchBar from '../../../../components/General/Inputs/SearchBar/SearchBar'

const RequestsSearchBar = ({ searchFilters, setSearchFilters }) => {

    
    const artistOnChange = (value) => {
        setSearchFilters({...searchFilters, artist: value})
    }
    const cityOnChange = (value) => {
        setSearchFilters({...searchFilters, city: value})
    }

    return (
        <div className='requests-searchbar'>
            <div className='requests-search'>
                <SearchBar collapsable={false} labelValue='Artist' searchOnChange={artistOnChange} />
                <SearchBar collapsable={false} labelValue='City' searchOnChange={cityOnChange} />
            </div>
        </div>
    )
}

export default RequestsSearchBar