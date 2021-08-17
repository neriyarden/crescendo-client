import React, { useState } from 'react'

function Tag({ data, tagOnChange, tagIndex }) {
    const [checked, setChecked] = useState(data.checked)

    const onChangeHandler = (tagIndex) => {
        setChecked((prev) => !prev)
        tagOnChange(tagIndex)
    }

    return (
        <div className="category-tag">
            <label>
                <input
                    value={data.id}
                    type="checkbox"
                    name='tags'
                    checked={checked}
                    onChange={() => onChangeHandler(tagIndex)}
                />
                <span>{data.name}</span>
            </label>
        </div>
    )
}

export default Tag
