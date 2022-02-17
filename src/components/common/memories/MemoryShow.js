import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { memoryGetById } from '../../../lib/api.js'
import { isOwner } from '../../../lib/auth.js'

import { buttonStyle } from '../../../lib/bootstrap-css-config.js'
import Error from '../Error.js'

function MemoryShow () {
  const { memoryId } = useParams()
  const _isOwner = isOwner(memoryId)
  const [memory, setMemory] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [trip, setTrip] = React.useState(null)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    const getMemory = async () => {
      try {
        const memoryData = await memoryGetById()
        setMemory(memoryData.data)
        setUser(memoryData.data.addedBy)
        setTrip(memoryData.data.pairedTrip)
      } catch (err) {
        setIsError(true)
      }
    }
    getMemory()
  }, [memoryId] )

  const readableTime = new Date(Date.parse(memory ? memory.created_at : 1)).toLocaleString()
  
  return (
    <>
      {isError ? (
        <Error />
      ) : (

        <div className="row py-4 px-4">
          <div className="col-md-5 mx-auto">

            {/* <!-- Profile widget --> */}

            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="d-flex align-items-end profile-head">
                  <div className="profile mr-3"><img src={user && user.image} alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
                  </div>
                  <div className="d-flex-body mb-5 text-white">
                    <h4 className="memsname text-uppercase mt-0 mb-0 ms-3">{user && user.displayName}</h4>
                    <p className="memslocation text-capitalize small mb-4">
                      <i className="fas fa-map-marker-alt mr-2 ms-3"></i>{user && user.location}</p>
                  </div>
                </div>
              </div>
              <ul className="list-inline mb-0">
                <br></br><br></br>
              </ul>
              <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="fluid h-100">
                    {memory &&
          <div className="fluid">
            <div className="memstitle gy-1 row row-col text-wrap text-center text-capitalize">
              <h2>{memory && memory.name}</h2>
              <img src={memory && memory.image}/>
            </div>
            <div className="p-3 rounded shadow-sm bg-light">
              <div className="row memory-info-holder">
                
                {trip && (
                  <div className="col-sm-4">
                    <p>Part of <Link to={`/trips/${trip._id}`}>
                      {trip.title}
                    </Link></p>
                  </div>
                )}
                
                <div className="col-sm-8">
                  <p>Added on {memory && readableTime} </p>
                </div>
              </div>
            </div>
            <br></br>
            <div className="p-3 rounded shadow-sm bg-light">
              <div className="row text-wrap text-center">
                <div className="col-sm-12">
                  <p>{memory && memory.location}</p>
                  <p>{memory && memory.notes}</p>
                </div>
              </div>

            </div>
          </div>}
                  </div>
                </div>
                {_isOwner && (
                  <button>
                    <Link to={trip ? `/trips/${trip._id}/edit` : '/'}
                      className={`btn ${buttonStyle.default} btn-sm d-flex justify-content-center`}>
                  Edit / Delete Memory</Link>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
    
      )}
    </>
  )
}

export default MemoryShow
