import React from 'react'

const MenuToggleBtn = ({ showToggleBtnMenu }) => {
	return (
		<div
			href=''
			className='navbar-toggle-button'
			onClick={showToggleBtnMenu}
		>
			<span className='navbar-toggle-button-bar'></span>
			<span className='navbar-toggle-button-bar'></span>
			<span className='navbar-toggle-button-bar'></span>
		</div>
	)
}

export default MenuToggleBtn
