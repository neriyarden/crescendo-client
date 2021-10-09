import React from 'react'
import SelectInput from '../../../../components/General/Inputs/SelectInput/SelectInput'
import SearchBar from '../../../../components/General/Inputs/SearchBar/SearchBar'
import CategoryTags from './Tags/CategoryTags'

const EventsSearchBar = ({ onFilterChange }) => {
	const onValueUpdate = key => value => {
		if (value === ' ') return
		onFilterChange({ [key]: value })
	}

	return (
		<div className='events-searchbar'>
			<div className='browse-events-search'>
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
				<SelectInput
					searchOnChange={onValueUpdate('when')}
					defaultOption='When?'
					optionsData={[
						{ value: 'today', label: 'Today' },
						{ value: 'thisWeek', label: 'This Week' },
						{ value: 'thisMonth', label: 'This Month' },
						{ value: 'all', label: 'All' },
					]}
				/>
			</div>
			<div className='separation-line' />
			<CategoryTags tagsOnChange={onValueUpdate('tags')} />
		</div>
	)
}

export default EventsSearchBar
