import React from 'react'

const Tag = ({ tagData, tagOnChange, tagIndex }) => {
	return (
		<div className='category-tag'>
			<label>
				<input
					value={tagData.id}
					type='checkbox'
					name='tags'
					checked={tagData.checked}
					onChange={() => tagOnChange(tagIndex)}
				/>
				<span>{tagData.name}</span>
			</label>
		</div>
	)
}

export default Tag
