import React from 'react'
import { Link } from 'react-router-dom'

const Tab = ({ url, label, selectedTab, onClickHandler }) => {
	return (
		<Link to={`${url}/${label}`}>
			<div
				className={`tab ${selectedTab === label ? 'active-tab' : ''}`}
				onClick={() => onClickHandler(label)}
			>
				{label}
			</div>
		</Link>
	)
}

export default Tab
