import { httpRequest } from './axios'

// TODO documentation

const signIn = async (data) => {
    const creds = { email: data.email, password: data.password }
    const results = await httpRequest(`/signIn`, 'POST', creds)
    return results
}

const registerNewUser = async (data) => {
    const results = await httpRequest(`/users`, 'POST', data)
    return results
}

const getArtistsData = async (filters) => {
    const results = await httpRequest(
        `/artists?size=${filters.size || 50}&pageNum=${filters.pageNum || 1}`
        + `${filters.startsWith ? `&startsWith=${filters.startsWith}` : ''}`
        + `${filters.searchTerm ? `&searchTerm=${filters.searchTerm}` : ''}`,
        'GET'
    )
    return results
}

const getArtistData = async (userId) => {
    const artistData = await httpRequest(`/artists/${userId}`, 'GET')
    return artistData
}

const getEventData = async (id) => {
    const eventData = await httpRequest(`/events/${id}`, 'GET')
    return eventData
}

const getFutureEventsData = async (filters) => {
    const results = await httpRequest(
        `/events?size=${filters.size || -1}&pageNum=${filters.pageNum || 1}`
        + `${filters.artist ? `&artist=${filters.artist}` : ''}`
        + `${filters.city ? `&city=${filters.city}` : ''}`
        + `${filters.when ? `&when=${filters.when}` : ''}`
        + `${filters.tags.length > 0 ? `&tags=${filters.tags.join('&tags=')}` : ''}`
        , 'GET'
    )
    return results
}

const getRequestsData = async (filters) => {
    const results = await httpRequest(
        `/requests?size=${filters.size || -1}&pageNum=${filters.pageNum || 1}`
        + `${filters.artist ? `&artist=${filters.artist}` : ''}`
        + `${filters.city ? `&city=${filters.city}` : ''}`
        , 'GET'
    )
    return results

}

const getPastEventsData = async (pageNum = 1, size = 25) => {
    const results = await httpRequest(`/events?when=past`, 'GET')
    return results
}

const getUpcomingEventsData = async () => {
    const results = await httpRequest(`/events`, 'GET')
    return results
}

const getTags = async () => {
    const results = await httpRequest('/tags', 'GET')
    return results
}
const getTagsIDs = async () => {
    return await httpRequest('/tags/ids', 'GET')
}

const getUserData = async (userId) => {
    return httpRequest(`/users/${userId}`, 'GET')
}

const getArtistEvents = async (artistId) => {
    const results = await httpRequest(`/artists/${artistId}/events`, 'GET')
    return results
}

const getArtistRequests = async (artistId) => {
    const results = await httpRequest(`/artists/${artistId}/requests`, 'GET')
    return results
}

const getUserVotes = async (userId) => {
    const results = await httpRequest(`/users/${userId}/votes`, 'GET')
    return results
}

const editUserData = async (values) => {
    const results = await httpRequest(`/users`, 'PATCH', values)
    return results
}

const editArtistDetails = async (formData) => {
    const results = await httpRequest(`/artists`, 'PATCH', formData)
    return results
}

const addNewEvent = async (newEventData) => {
    const results = await httpRequest(`/events`, 'POST', newEventData)
    return results
}

const editEvent = async (eventData) => {
    const results = await httpRequest(`/events`, 'PATCH', eventData)
    return results
}

const markEventAsSoldOut = async (eventId) => {
    // ?

}

const deleteEvent = async (eventId) => {
    const results = await httpRequest(`/events/${eventId}`, 'DELETE')
    return results
}

const castVote = async (requestId, userId) => {
    const results = await httpRequest(
        `/requests/${requestId}/vote/${userId}`,
        'POST'
    )
    return results
}

const removeVote = async (requestId, userId) => {
    const results = await httpRequest(
        `/requests/${requestId}/vote/${userId}`,
        'DELETE'
    )
    return results
}

const addNewRequest = async (newRequestData) => {
    const results = await httpRequest(`/requests`, 'POST', newRequestData)
    return results
}

const editRequest = async (requestData) => {
    const results = await httpRequest(`/requests`, 'PATCH', requestData)
    return results
}

const deleteRequest = async (requestId) => {
    const results = await httpRequest(`/requests/${requestId}`, 'DELETE')
    return results
}



export default {
    addNewEvent,
    addNewRequest,
    deleteEvent,
    deleteRequest,
    editArtistDetails,
    editEvent,
    editRequest,
    editUserData,
    markEventAsSoldOut,
    getArtistsData,
    getArtistEvents,
    getArtistData,
    getArtistRequests,
    getEventData,
    getFutureEventsData,
    getPastEventsData,
    getRequestsData,
    getTags,
    getTagsIDs,
    getUpcomingEventsData,
    getUserData,
    getUserVotes,
    registerNewUser,
    removeVote,
    castVote,
    signIn
}

