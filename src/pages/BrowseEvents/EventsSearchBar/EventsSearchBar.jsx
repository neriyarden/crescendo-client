import React from 'react'
import SelectInput from '../../../components/General/Inputs/SelectInput/SelectInput'
import SearchBar from '../../../components/General/Inputs/SearchBar/SearchBar'
import CategoryTags from './Tags/CategoryTags'


const EventsSearchBar = ({ searchFilters, setSearchFilters }) => {

    
    const artistOnChange = (value) => {
        setSearchFilters({...searchFilters, artist: value})
    }
    const cityOnChange = (value) => {
        setSearchFilters({...searchFilters, city: value})
    }
    const whenOnChange = (value) => {
        setSearchFilters({...searchFilters, when: value})
    }
    const tagsOnChange = (value) => {
        setSearchFilters({...searchFilters, tags: value})
    }

    return (
        <div className='events-searchbar'>
            <div className='browse-events-search'>
                <SearchBar collapsable={false} labelValue='Artist' searchOnChange={artistOnChange} />
                <SearchBar collapsable={false} labelValue='City' searchOnChange={cityOnChange} />
                <SelectInput 
                    searchOnChange={whenOnChange}
                    defaultOption='When?'
                    optionsData={[
                        {value: "today", label: 'Today'},
                        {value: "thisWeek", label: 'This Week'},
                        {value: "thisMonth", label: 'This Month'},
                        {value: "all", label: 'All'}
                    ]}
                />
            </div>
            <div className='separation-line'/>
            <CategoryTags tagsOnChange={tagsOnChange}/>
        </div>
    )
}

export default EventsSearchBar
