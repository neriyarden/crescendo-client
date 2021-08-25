import React, { useState, useEffect } from 'react'
import Crescendo from './pages/Crescendo'
import Cookies from 'js-cookie'
import API from './DAL/api'
import AuthApi from './services/contexts/AuthApi'
import ReloadApi from './services/contexts/Reload'
import utils  from './utils'

function App() {
  const [auth, setAuth] = useState(null)
  const [reloadAuth, setReloadAuth] = useState(false)
  
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
    setReloadAuth(false)
  }

  useState(() => {
    utils.getTags()
  }, [])

  // uncomment this...
  useEffect(() => {
    authenticateUser()
  }, [reloadAuth])

  return (
    <ReloadApi.Provider value={{ reloadAuth, setReloadAuth }}>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Crescendo />
      </AuthApi.Provider>
    </ReloadApi.Provider>
  );
}

export default App;
