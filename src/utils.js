import API from "./DAL/api"

const getTags = async () => {
    try {
        const tagsLocal = JSON.parse(sessionStorage.getItem('tags'))
        if(tagsLocal) return tagsLocal
    } catch {
        sessionStorage.removeItem('tags')
    }
    const tagsRemote = await API.getTags()
    sessionStorage.setItem('tags', JSON.stringify(tagsRemote))
    return tagsRemote
}

const formatDateToDDMMYYYY = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

const formatDDMMYYYToYYYYMMDD = (date) => {
    return date.split('/').map(xx => xx.padStart(2, '0')).reverse().join('-')
}

export default {
    getTags,
    formatDateToDDMMYYYY,
    formatDDMMYYYToYYYYMMDD,
}