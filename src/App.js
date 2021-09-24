import React, { useState, useEffect, useCallback } from 'react'
import Crescendo from './pages/Crescendo'
import api from './DAL/api'
import { AuthApi } from './services/contexts/AuthApi'
import { getTags } from './utils/utils'
import jwt_decode from 'jwt-decode'
import { ErrorBoundary } from './services/errors/ErrorBoundary'


let logoutTimer;
const expirationTime = 1000 * 60 * 60

const App = () => {
  const [auth, setAuth] = useState(null)
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null)

  const cacheUserVotedRequests = async (userId) => {
    const userVotedRequests = await api.getUserVotes(userId)
    if (userVotedRequests?.error) {
      return sessionStorage.setItem('user_voted_requests', JSON.stringify([]))
    }
    sessionStorage.setItem(
      'user_voted_requests', JSON.stringify(userVotedRequests)
    )
  }

  const authenticateUser = useCallback(async (userId, token) => {
    setToken(token)

    let expiration = null
    if (!userId || !token) {
      let storedData = JSON.parse(localStorage.getItem('userData'))
      if (!storedData || !storedData.token) {
        logout()
      }
      [userId, token, expiration] = [storedData.user_id, storedData.token, storedData.expiration]
    }
    let userData = jwt_decode(token)
    if (userData.is_artist) {
      const artistData = await api.getArtistData(userId)
      userData = { ...userData, ...artistData }
    }

    const tokenExpirationDate = expiration || new Date(new Date().getTime() + expirationTime)
    if (new Date(tokenExpirationDate) < new Date()) {
      setToken(null)
      return setAuth(null)
    }
    setTokenExpirationDate(tokenExpirationDate)
    setAuth({ ...userData, token })
    localStorage.setItem('userData', JSON.stringify({
      ...userData,
      token,
      expiration: tokenExpirationDate
    }))
    cacheUserVotedRequests(userId)
  }, [])

  const logout = () => {
    localStorage.removeItem('userData')
    sessionStorage.removeItem('user_voted_requests')
    sessionStorage.removeItem('myEvents')
    sessionStorage.removeItem('myRequests')
    setToken(null)
    setTokenExpirationDate(null)
    setAuth(null)
  }
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, authenticateUser, tokenExpirationDate])

  useState(() => {
    getTags()
  }, [])

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      authenticateUser(storedData.user_id, storedData.token)
    }
  }, [authenticateUser])

  return (
    <ErrorBoundary>
      <AuthApi.Provider value={{
        auth,
        setAuth,
        logout,
        reloadAuth: authenticateUser,
      }}>
        <Crescendo />
      </AuthApi.Provider>
    </ErrorBoundary>
  );
}

export default App;
