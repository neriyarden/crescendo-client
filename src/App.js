import React, { useState, useEffect, useCallback } from 'react'
import Crescendo from './pages/Crescendo'
import API from './DAL/api'
import { AuthApi } from './services/contexts/AuthApi'
import { getTags } from './utils/utils'
import jwt_decode from 'jwt-decode'

let logoutTimer;

const App = () => {
  const [auth, setAuth] = useState(null)
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null)

  const cacheUserVotedRequests = async (userId) => {
    const userVotedRequests = await API.getUserVotes(userId)
    if (userVotedRequests?.error) {
      return sessionStorage.setItem('user_voted_requests', JSON.stringify([]))
    }
    sessionStorage.setItem(
      'user_voted_requests', JSON.stringify(userVotedRequests)
    )
  }

  const authenticateUser = useCallback(async (userId = null, token = null) => {
    console.log('userId:', userId);
    console.log('token:', token);

    let expiration = null
    if (!userId || !token) {
      let storedData = JSON.parse(localStorage.getItem('userData'))
      if(!storedData || !storedData.token) {
        setToken(null)
        return setAuth(null)
      }
      [userId, token, expiration] = [storedData.user_id, storedData.token, storedData.expiration]
    }
    setToken(token)
    let userData = jwt_decode(token)
    if (userData.is_artist) {
      const artistData = await API.getArtistData(userId)
      userData = { ...userData, ...artistData }
    }
    console.log('expiration', expiration, typeof expiration);
    const tokenExpirationDate =  expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
    console.log('tokenExpirationDate', tokenExpirationDate, typeof tokenExpirationDate);
    if (new Date(tokenExpirationDate) < new Date()) {
      console.log('new Date(expiration), new Date()', new Date(expiration), new Date());
      setToken(null)
      return setAuth(null)
    }
    setTokenExpirationDate(tokenExpirationDate)
    setAuth({...userData, token})
    localStorage.setItem('userData', JSON.stringify({
      ...userData,
      token,
      expiration: tokenExpirationDate
    }))
    cacheUserVotedRequests(userId)
  }, [])

  const signOut = () => {
    localStorage.removeItem('userData')
    sessionStorage.removeItem('user_voted_requests')
    sessionStorage.removeItem('myEvents')
    sessionStorage.removeItem('myRequests')
    setToken(null)
    setTokenExpirationDate(null)
    setAuth(null)
  }

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate - new Date().getTime()
      logoutTimer = setTimeout(authenticateUser, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, authenticateUser, tokenExpirationDate])

  useState(() => {
    getTags()
  }, [])

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token) {
      authenticateUser(storedData.user_id, storedData.token)
    }
  }, [authenticateUser])

  return (
    <AuthApi.Provider value={{
      auth,
      setAuth,
      signOut,
      reloadAuth: authenticateUser,
    }}>
      <Crescendo />
    </AuthApi.Provider>
  );
}

export default App;
