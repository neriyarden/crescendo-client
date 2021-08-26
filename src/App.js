import React, { useState, useEffect, useCallback } from 'react'
import Crescendo from './pages/Crescendo'
import Cookies from 'js-cookie'
import API from './DAL/api'
import { AuthApi } from './services/contexts/AuthApi'
import utils  from './utils'

const App = () => {
  const [auth, setAuth] = useState(null)
  
  const cacheUserVotedRequests = async (userId) => {
    const userVotedRequests = await API.getUserVotes(userId)
    if (userVotedRequests.status === 404) {
      return sessionStorage.setItem('user_voted_requests', JSON.stringify([]))
    }
    sessionStorage.setItem(
      'user_voted_requests', JSON.stringify(userVotedRequests)
    )
  }

  const authenticateUser = async () => {
    const userId = Cookies.getJSON('session_id')
    if (userId) {
      let userData = await API.getUserData(userId)
      if (userData.is_artist) {
        const artistData = await API.getArtistData(userId)
        userData = { ...userData, ...artistData }
      }
      setAuth(userData)
      cacheUserVotedRequests(userId)
    }
  }

  useState(() => {
    utils.getTags()
  }, [])

  useEffect(() => {
    authenticateUser()
  }, [])

  return (
      <AuthApi.Provider value={{ auth, setAuth, reloadAuth: authenticateUser }}>
        <Crescendo />
      </AuthApi.Provider>
  );
}

export default App;
