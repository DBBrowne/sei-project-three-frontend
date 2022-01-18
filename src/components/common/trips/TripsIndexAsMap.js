import { useEffect, useState } from 'react'

import { getAllTrips } from '../../../lib/api'
import Error from '../Error'
import { randomRGBA } from '../maps/helpers/helpers'
import RenderMap from '../maps/RenderMap'
import TripCardSmall from './TripCardSmall'

const attachLineColorToTrips = (trips) => {
  return trips.map(trip => {
    trip.lineColor = randomRGBA({ alpha: 0.8 })
    return trip
  })
}

function TripsIndexAsMap () {
  const [tripList, setTripList] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
    const getTripList = async()=>{
      try {
        const res = await getAllTrips()
        const tripsWithLineColor = attachLineColorToTrips(res.data)
        setTripList(tripsWithLineColor)
      } catch (err){
        setIsError(true)
      }
    } 
    getTripList()
  }, [])

  return (
    <section className="section row">
      {isError ? (
        <Error />
      ) : (
        <>
          <div className='index-map-container row' style={{ height: 500 }}>
            <RenderMap arrayOfTrips={tripList}/>
          </div>
          <div className='row'>
            {
              Boolean(tripList.length) && tripList.map(trip =>(
                <TripCardSmall key={trip._id} trip={trip}/>
              ))
            }
          </div>
        </>
      )}
    </section>
  )
}

export default TripsIndexAsMap