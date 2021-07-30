import React, { useState } from 'react'
import Toggle from './Toggle'

// TODO generalize this component
function Toggles({ name, labels }) {
    const toggles = labels.map((label, i) => (
        <Toggle key={i} name={name} value={''+ i} label={label}/>
    ))

    return (
        <>
            <span className='server-error-message'>You are a?</span>
            <div className="toggles" 
            >
                {toggles}
                {/* <Toggle name='is_artist' value='0' label='fan' checked /> */}
                {/* <Toggle name='is_artist' value='1' label='artist' /> */}
            </div>
        </>
    )
}

export default Toggles
