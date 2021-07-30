const formatDateToDDMMYYYY = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

const formatDDMMYYYToYYYYMMDD = (date) => {
    return date.split('/').map(xx => xx.padStart(2, '0')).reverse().join('-')
}

export default {
    formatDateToDDMMYYYY,
    formatDDMMYYYToYYYYMMDD
}