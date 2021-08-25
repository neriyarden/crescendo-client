import React from 'react'

function SelectInput({ defaultOption, optionsData, searchOnChange }) {
    const options = optionsData.map(optionData => {
        return<option key={optionData.value} value={optionData.value}>{optionData.label}</option>
    })

    const onValueChange = ({target: { value }}) => {
        searchOnChange(value)
    }

    return (
        <div className='search-input-group select-group'>
            <select 
            className='select-input' 
            onChange={onValueChange}
            defaultValue={defaultOption}
            >
                <option hidden>{defaultOption}</option>
                {options}
            </select>
        </div>
    )
}

export default SelectInput
