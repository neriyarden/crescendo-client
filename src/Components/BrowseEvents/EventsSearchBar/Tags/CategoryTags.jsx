import React, { useEffect, useState } from 'react'
import Tag from './Tag'
import API from '../../../../DAL/api'

function CategoryTags({ tagsOnChange }) {
    const [tagsData, setTagsData] = useState([])

    const onChangeHandler = (id) => {
        tagsData[id - 1].checked = !tagsData[id - 1].checked
        setTagsData([...tagsData])
        tagsOnChange(tagsData.filter(tag => tag.checked).map(tag => tag.id))
    }


    const getTags = async () => {
        let tagsData = JSON.parse(sessionStorage.getItem('tags')) 
        if(!tagsData) tagsData = await API.getTags() 
        tagsData.forEach(tag => tag.checked = false)
        setTagsData(tagsData)
    }

    useEffect(() => {
        getTags()
    }, [])

    const tags = tagsData.map(tagData =>
        <Tag 
            key={tagData.id} data={tagData} tagOnChange={onChangeHandler}
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
