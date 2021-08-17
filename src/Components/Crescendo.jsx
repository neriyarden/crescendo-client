import '../Scss/main.scss'
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import UpcomingEvents from './UpcomingEvents/UpcomingEvents'
import BrowseEvents from './BrowseEvents/BrowseEvents'
import BrowseArtists from './BrowseArtists/BrowseArtists'
import RequestsPage from './RequestsPage/RequestsPage'
import LoginPage from './LoginPage/LoginPage'
import RegisterPage from './RegisterPage/RegisterPage'
import Footer from './Footer/Footer'
import ArtistPage from './ArtistPage/ArtistPage'
import EventPage from './EventPage/EventPage'
import UserArea from './UserArea/UserArea'
import ProtectedRoute from './AuthRoutes/ProtectedRoute'
import LoggedInRoute from './AuthRoutes/LoggedInRoute'

function Crescendo() {
    return (

        <Router>
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
                            <ProtectedRoute path='/Requests' component={RequestsPage} />
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
                        </Switch>
                    <Footer />
                </div>
        </Router>
    )
}



export default Crescendo

