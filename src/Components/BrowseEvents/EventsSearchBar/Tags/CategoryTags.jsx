import React, { useEffect, useState } from 'react'
import Tag from './Tag'
import API from '../../../../DAL/api'
import utils from '../../../../utils'


function CategoryTags({ tagsOnChange }) {
    const [tagsData, setTagsData] = useState([])

    const onChangeHandler = (tagIndex) => {
        tagsData[tagIndex].checked = !tagsData[tagIndex].checked
        setTagsData([...tagsData])
        tagsOnChange(tagsData.filter(tag => tag.checked).map(tag => tag.id))
    }

    const setTags = async () => {
        let tagsData = await utils.getTags()
        console.log('tagsData:', typeof tagsData, tagsData);
        tagsData.forEach(tag => tag.checked = false)
        setTagsData(tagsData)
    }

    useEffect(() => {
        setTags()
    }, [])

    const tags = tagsData.map((tagData, i) =>
        <Tag 
            key={tagData.id} data={tagData} tagIndex={i} tagOnChange={onChangeHandler}
        />
    )
    return (
        <div className='category-tags'>
            <div className="tags-container">
                {tags}
            </div>
        </div>
    )
}

export default CategoryTags
