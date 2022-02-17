import React from 'react'
import { logoImageLink } from '../../config.js'
import { useParams, Link } from 'react-router-dom'

import Error from '../common/Error.js'
import { buttonStyle } from '../../lib/bootstrap-css-config.js'
import { countriesGetById, getAllTrips } from '../../lib/api.js'

function CountryShow () {
  const { countryId } = useParams()

  const [country, setCountry] = React.useState(null)
  const [trips, setTrips] = React.useState(null)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    const getCountry = async () => {
      try {
        const countryData = await countriesGetById(countryId)
        setCountry(countryData.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getCountry()
  }, [countryId] )

  React.useEffect(() => {
    const getTrips = async () => {
      try {
        const tripData = await getAllTrips()
        setTrips(tripData.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getTrips()
  }, [countryId])

  //todo: convert to api call, push filtering back to DB
  const countriesAndTrips = () => {
    if (country && trips) {
      const matches = trips.filter((trip => {
        return trip.countryVisited === country.name
      }))
      return matches
    } else {
      return 
    } 
  }


  return (
    <div className="row py-2 px-4">
      <div className="col-md-10 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="d-flex-body mb-1 text-white">
            </div>
          </div>

          {isError ? (
            <Error />
          ) :
            <><div className='row header-wrapper mb-4'>

              <div className='col'>
                <div className='header-splash-single'>
                  <img src={country && country.image} />
                </div>
              </div>

              <div className="px-4 py-1">
                <div className="p-3 rounded shadow-sm bg-light mt-2 mb-2">
                  <p className="font-italic mb-0 text-center">{country && country.summary}</p>
                </div>

                <div className="single-country-text-group row">
                  <div className="col-4 ">
                    <div className="info-container p-1 rounded shadow-sm bg-light mt-1 mb-1">
                      <h4>{country && country.name}</h4>
                      <p>code: {country && country.countrycode}</p></div>
                  </div>
                  <div className="col-4">
                    <div className="info-container p-1 rounded shadow-sm bg-light mt-2 mb-2">
                      <h4>Languages</h4>
                      <p>{country && country.language}</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="info-container p-1 rounded shadow-sm bg-light mt-2 mb-2">
                      <h4>Currency</h4>
                      <p>{country && country.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div><div className="container pg-index">
              <div className="gy-2 row row-cols-3">
                {/* todo: calling filter function 5 times here.  Refector to store result in a const and refilter at most once per render */}
                {!countriesAndTrips() || !countriesAndTrips()[0] &&
                    <Link to={'/trips/new'}>
                      <div className="card">
                        <img className='' src={logoImageLink} alt="Card image cap"></img>
                        <div className="card-body">
                          <h6 className="country-card-title text-decoration-none">No adventures here yet!</h6>
                          <button className={`btn ${buttonStyle.default} btn-sm`}>Be the first to share your trip</button>
                        </div>
                      </div>
                    </Link>}

                {countriesAndTrips() && countriesAndTrips()[0] &&
                    countriesAndTrips().map((trip => {
                      return (
                        <Link key={trip._id} to={`/trips/${trip._id}`}>
                          <div className="card">
                            <img className='' src={trip.memories[0] ? trip.memories[0].image : 'https://static.toiimg.com/thumb/66440952/road-trip.jpg?width=1200&height=900'} alt="Card image cap"></img>
                            <div className="card-body">
                              <h6 className="country-card-title text-decoration-none">{trip.title}</h6>
                              <button className={`btn ${buttonStyle.default} btn-sm`}>See their trip</button>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                    ))}
                <br></br>
              </div>
            </div></>
          }
        </div>
      </div>
    </div>
  )

}

export default CountryShow
