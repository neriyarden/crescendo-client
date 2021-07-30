import React, { useState } from 'react'

function Tag({ data, tagOnChange }) {
    const [checked, setChecked] = useState(data.checked)

    const onChangeHandler = ({ target: { value } }) => {
        setChecked((prev) => !prev)
        tagOnChange(value)
    }

    return (
        <div className="category-tag">
            <label>
                <input
                    value={data.id}
                    type="checkbox"
                    name='tags'
                    checked={checked}
                    onChange={onChangeHandler}
                />
                <span>{data.name}</span>
            </label>
        </div>
    )
}

export default Tag
