import React, { useState,  } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ collapsable, labelValue, searchOnChange }) => {
    const [activeSearch, setActiveSearch] = useState(collapsable ? '' : 'active-search')
    const [searchTerm, setSearchTerm] = useState('')

    const activateSearch = () => {
        if(!collapsable) return
        const activeClass = activeSearch ? '' : 'active-search'
        setActiveSearch(activeClass)
    }

    const onValueChange = ({target: { value }}) => {
        setSearchTerm(value)
        searchOnChange(value)
    }

    return (
        <div className="search-input-group">
                <label 
                    className='search-label' 
                    htmlFor={`input-field-${labelValue.toLowerCase()}`}
                >
                    {labelValue}:
                </label>
                <div className={`search-bar ${activeSearch}`}>
                    <div className='search-icon' onClick={activateSearch}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    <div className="search-input">
                        <input 
                            type="text" 
                            placeholder={`Search By ${labelValue}`} 
                            name="input-field-search" 
                            id={`input-field-${labelValue.toLowerCase()}`}
                            value={searchTerm}
                            onChange={onValueChange}
                            />
                    </div>
                        <FontAwesomeIcon 
                            icon={faTimes}
                            size='xs'
                            className='clear-search'
                            onClick={() => onValueChange({target: {value: ''}})}
                            />
                </div>
            </div>
    )
}

export default SearchBar
