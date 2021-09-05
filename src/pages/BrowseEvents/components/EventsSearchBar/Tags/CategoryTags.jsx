import React, { useEffect, useState } from 'react'
import Tag from './Tag'
import { getTags } from '../../../../../utils/utils'


const CategoryTags = ({ tagsOnChange }) => {
    const [tagsData, setTagsData] = useState([])

    const onChangeHandler = (tagIndex) => {
        tagsData[tagIndex].checked = !tagsData[tagIndex].checked
        setTagsData([...tagsData])
        tagsOnChange(tagsData.filter(tag => tag.checked).map(tag => tag.id))
    }

    const setTags = async () => {
        let tagsData = await getTags()
        tagsData.forEach(tag => tag.checked = false)
        setTagsData(tagsData)
    }

    const tags = tagsData.map((tagData, i) =>
        <Tag
            key={tagData.id} tagData={tagData} tagIndex={i} tagOnChange={onChangeHandler}
        />
    )

    useEffect(() => {
        setTags()
    }, [])

    return (
        <div className='category-tags'>
            <div className="tags-container">
                {tags}
            </div>
        </div>
    )
}

export default CategoryTags
