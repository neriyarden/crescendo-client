import React from 'react'
import SearchBar from '../../../../components/General/Inputs/SearchBar/SearchBar'

const RequestsSearchBar = ({ searchFilters, setSearchFilters }) => {
	const onValueUpdate = key => value => {
		setSearchFilters({ ...searchFilters, [key]: value })
	}

	return (
		<div className='requests-searchbar'>
			<div className='requests-search'>
				<SearchBar
					isCollapsable={false}
					labelValue='Artist'
					searchOnChange={onValueUpdate('artist')}
				/>
				<SearchBar
					isCollapsable={false}
					labelValue='City'
					searchOnChange={onValueUpdate('city')}
				/>
			</div>
		</div>
	)
}

export default RequestsSearchBar
