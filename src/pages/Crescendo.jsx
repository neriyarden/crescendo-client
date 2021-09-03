import '../scss/main.scss'
import React, { Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Header from '../components/Header/Header'
// import HomePage from './HomePage/HomePage'
import UpcomingEvents from './UpcomingEvents/UpcomingEvents'
// import BrowseEvents from './BrowseEvents/BrowseEvents'
// import BrowseArtists from './BrowseArtists/BrowseArtists'
// import BrowseRequests from './BrowseRequests/BrowseRequests'
// import LoginPage from './LoginPage/LoginPage'
// import RegisterPage from './RegisterPage/RegisterPage'
import Footer from '../components/Footer/Footer'
// import ArtistPage from './ArtistPage/ArtistPage'
// import EventPage from './EventPage/EventPage'
// import UserArea from './UserArea/UserArea'
// import ProtectedRoute from '../services/auth/ProtectedRoute'
// import LoggedInRoute from '../services/auth/LoggedInRoute'
import Loader from '../components/General/Loader'

const BrowseEvents = React.lazy(() => import('./BrowseEvents/BrowseEvents'))
const BrowseArtists = React.lazy(() => import('./BrowseArtists/BrowseArtists'))
const BrowseRequests = React.lazy(() => import('./BrowseRequests/BrowseRequests'))
const LoginPage = React.lazy(() => import('./LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('./RegisterPage/RegisterPage'))
const ArtistPage = React.lazy(() => import('./ArtistPage/ArtistPage'))
const EventPage = React.lazy(() => import('./EventPage/EventPage'))
const UserArea = React.lazy(() => import('./UserArea/UserArea'))
const ProtectedRoute = React.lazy(() => import('../services/auth/ProtectedRoute'))
const LoggedInRoute = React.lazy(() => import('../services/auth/LoggedInRoute'))



const Crescendo = () => {
    return (

        <Router>
            <Suspense fallback={<div className='center-text'><Loader /></div>}>
                <Header />
                <div className='app-body'>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/Upcoming' />
                            {/* <HomePage /> */}
                        </Route>
                        <Route path='/Upcoming'>
                            <UpcomingEvents />
                        </Route>
                        <Route exact path='/Events'>
                            <BrowseEvents />
                        </Route>
                        <Route exact path='/Artists'>
                            <BrowseArtists />
                        </Route>
                        <ProtectedRoute path='/Requests' component={BrowseRequests} />
                        <LoggedInRoute path='/SignIn' component={LoginPage} />
                        <Route exact path='/SignUp'>
                            <RegisterPage />
                        </Route>
                        <Route path='/Artists/:id'>
                            <ArtistPage />
                        </Route>
                        <Route path='/Events/:id'>
                            <EventPage />
                        </Route>
                        <ProtectedRoute path='/User' component={UserArea} />
                        <Redirect to='/' />
                    </Switch>
                    <Footer />
                </div>
            </Suspense>
        </Router>
    )
}



export default Crescendo

