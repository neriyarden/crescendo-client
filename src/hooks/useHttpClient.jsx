import { useState, useEffect, useCallback } from 'react'
import api from '../DAL/api'

// const httpRequest = async (path, method = 'GET', data = null) => {
//     try {
//         const response = await axiosRequest({
//             method,
//             url: '/api' + path,
//             data
//         })
//         console.log('response:', await response);
//         return await response.data
//     }
//     catch (err) {
//         console.log('response.error:', err.response?.data?.error);
//         return err.response
//     }
// }

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const sendRequest = (clientApiFunc, body = null) => {

    }

}