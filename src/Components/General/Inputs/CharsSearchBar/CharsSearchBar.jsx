import React from 'react'
import Char from './Char'

function CharsSearchBar({ onCharSelect }) {


    const onCharChange = ({ target: { value } }) => {
        if(value === '𝅘𝅥𝅮') value = ''
        onCharSelect(value)
    }

    const Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => {
            return <Char key={char} value={char} />
        })
    return (
        <div className='chars-search-bar' onChange={onCharChange}>
            <Char
                key='&#119136;'
                value='&#119136;'
                style={{fontWeight: '900', fontSize: '1.2rem', lineHeight: '1'}}
                checked
            />
            {Chars}
        </div>
    )
}

export default CharsSearchBar
