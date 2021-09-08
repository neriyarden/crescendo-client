import React, { useState, useEffect, useCallback } from 'react'
import Crescendo from './pages/Crescendo'
import API from './DAL/api'
import { AuthApi } from './services/contexts/AuthApi'
import { getTags } from './utils/utils'
import jwt_decode from 'jwt-decode'

const App = () => {
  const [auth, setAuth] = useState(null)

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
    if (!userId || !token) {
      let storedData = JSON.parse(localStorage.getItem('userData'))
      if(!storedData || !storedData.token) {
        return setAuth(null)
      }
      [userId, token] = [storedData.user_id, storedData.token]
    }
    let userData = jwt_decode(token)
    if (userData.is_artist) {
      const artistData = await API.getArtistData(userId)
      userData = { ...userData, ...artistData }
    }
    setAuth({...userData, token})
    localStorage.setItem('userData', JSON.stringify({ ...userData, token }))
    cacheUserVotedRequests(userId)
  }, [])

  const signOut = () => {
    localStorage.removeItem('userData')
    sessionStorage.removeItem('user_voted_requests')
    sessionStorage.removeItem('myEvents')
    sessionStorage.removeItem('myRequests')
    setAuth(null)
  }

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
