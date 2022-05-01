import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'

import Countries from './components/Countries/Countries'
import CountryShow from './components/Countries/CountryShow'

import MemoryShow from './components/common/memories/MemoryShow'

import AboutUs from './components/common/AboutUs'
import Profile from './components/common/Profile'
import ProfileEdit from './components/common/ProfileEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import TripEdit from './components/common/trips/TripEdit'
import TripCreate from './components/common/trips/TripCreate'
import TripShow from './components/common/trips/TripShow'
import TripsIndexAsMap from './components/common/trips/TripsIndexAsMap'
import SecureRoute from './components/common/SecureRoute'

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>

        <SecureRoute path="/profile/edit"><ProfileEdit /></SecureRoute>
        <Route path="/profile/:userId"><Profile /></Route>
        <SecureRoute path="/profile"><Profile /></SecureRoute>

        <Route exact path="/countries"><Countries/></Route>
        <Route path="/countries/:countryId"><CountryShow/></Route>
        
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>

        <Route path="/trips/new"><TripCreate /></Route>
        <SecureRoute path="/trips/:tripId/edit"><TripEdit /></SecureRoute>
        <Route path="/trips/:tripId/"><TripShow /></Route>
        <Route path="/trips/"><TripsIndexAsMap /></Route>

        <Route path="/memories/:memoryId"><MemoryShow /></Route>

      </Switch>
    </BrowserRouter>
  )
}
export default App


