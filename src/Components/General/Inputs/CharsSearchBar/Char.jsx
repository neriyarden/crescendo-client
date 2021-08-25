import React from 'react'

function Char({ value, style, checked }) {
    return (
        <label>
            <input value={value} type="radio" name='char' defaultChecked={checked}/>
            <span style={style}>{value}</span>
        </label>
    )
}

export default Char
