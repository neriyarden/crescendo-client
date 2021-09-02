import { useState, useRef, useCallback } from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (apiFunc, ...args) => {
        // setIsLoading(true)
        // const httpAbortCtrl = new AbortController()
        // activeHttpRequests.current.push(httpAbortCtrl)
        const results = await apiFunc(...args)
        if (results.error) {
            setError(results.error)
        }
        return results
        // setIsLoading(false)
    }, [])

    const clearError = () => setError(null)

    // useEffect(() => {
    //     return () => {
    //         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    //     }
    // }, [])

    return { isLoading, error, sendRequest, clearError }
}
