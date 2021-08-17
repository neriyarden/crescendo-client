import React, { useState, useEffect } from 'react'
import Crescendo from './Components/Crescendo'
import Cookies from 'js-cookie'
import API from './DAL/api'
import AuthApi from './Contexts/AuthApi'
import ReloadApi from './Contexts/Reload'
import utils  from './utils'

function App() {
  const [auth, setAuth] = useState(null)
  const [reloadAuth, setReloadAuth] = useState(false)

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

  const cacheUserVotedRequests = async (userId) => {
    const userVotedRequests = await API.getUserVotes(userId)
    if (userVotedRequests.status === 404) {
      return sessionStorage.setItem('user_voted_requests', JSON.stringify([]))
    }
    sessionStorage.setItem(
      'user_voted_requests', JSON.stringify(userVotedRequests)
    )
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
