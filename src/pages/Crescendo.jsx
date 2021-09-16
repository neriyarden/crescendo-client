import '../scss/main.scss'
import React, { Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Header from '../components/Header/Header'
import HomePage from './HomePage/HomePage'
import Footer from '../components/Footer/Footer'
import Loader from '../components/General/Loader'

const BrowseEvents = React.lazy(() => import('./BrowseEvents/BrowseEvents'))
const BrowseArtists = React.lazy(() => import('./BrowseArtists/BrowseArtists'))
const BrowseRequests = React.lazy(() => import('./BrowseRequests/BrowseRequests'))
const LoginPage = React.lazy(() => import('./LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('./RegisterPage/RegisterPage'))
const ArtistPage = React.lazy(() => import('./ArtistPage/ArtistPage'))
const EventPage = React.lazy(() => import('./EventPage/EventPage'))
const UserArea = React.lazy(() => import('./UserArea/UserArea'))
const ProtectedRoute = React.lazy(() => import('../services/authRoutes/ProtectedRoute'))
const LoggedInRoute = React.lazy(() => import('../services/authRoutes/LoggedInRoute'))



const Crescendo = () => {
    return (

        <Router>
            <Suspense fallback={<div className='center-text'><Loader /></div>}>
                <Header />
                <div className='app-body'>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/Home' />
                        </Route>
                        <Route path='/Home'>
                            <HomePage />
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

