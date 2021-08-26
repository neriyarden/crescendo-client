import React from 'react'
import Toggle from './Toggle'

// TODO generalize this component
const Toggles = ({ name, labels }) => {
    const toggles = labels.map((label, i) => (
        <Toggle key={i} name={name} value={'' + i} label={label} />
    ))

    return (
        <>
            <span className='toggles-label'>You are a?</span>
            <div className='toggles'
            >
                {toggles}
            </div>
        </>
    )
}

export default Toggles
