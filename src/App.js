import React, { useState, useEffect, useCallback } from 'react'
import Crescendo from './pages/Crescendo'
import Cookies from 'js-cookie'
import API from './DAL/api'
import { AuthApi } from './services/contexts/AuthApi'
import { getTags } from './utils'

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

  const authenticateUser = useCallback(async () => {
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
  }, [])

  const signOut = () => {
    Cookies.remove('session_id')
    sessionStorage.removeItem('user_voted_requests')
    sessionStorage.removeItem('myEvents')
    sessionStorage.removeItem('myRequests')
    setAuth(null)
  }

  useState(() => {
    getTags()
  }, [])

  useEffect(() => {
    authenticateUser()
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
