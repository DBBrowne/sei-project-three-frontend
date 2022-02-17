import { Link, useParams } from 'react-router-dom'
import React from 'react'

import { getUserId } from '../../lib/auth.js'
import { buttonStyle } from '../../lib/bootstrap-css-config.js'
import { getUserProfile, memoryGetAll } from '../../lib/api.js'
import Error from './Error.js'

const initialUserData = {
  displayName: '',
  email: '',
  firstName: '',
  surname: '',
  location: '',
  image: '',
  about: '',
  trips: [],
  memories: [],  

}

function Profile() {
  const [user, setUser] = React.useState(initialUserData)
  //temporary until memories is populated from BE:
  const [memoriesArray, setMemoriesArray] = React.useState([])
  const [isError, setIsError] = React.useState(false)

  // if viewing own profile(ie no parameter), set userId to empty string
  let { userId } = useParams()
  if (!userId){
    userId = ''
  }

  React.useEffect( ()=>{
    const getUser = async () => {
      try {
        const res = await getUserProfile(userId)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [userId] )

  React.useEffect(()=>{
    const getMemories = async () => {
      try {
        const memoryData = await memoryGetAll()
        const thisUserId = userId || getUserId()
        setMemoriesArray(
          memoryData.data.filter(
            memory => memory.addedBy === thisUserId
          )
        )
        
      } catch (err) {
        setIsError(true)
      }
    }
    getMemories()
    // temporary usage until memories is populated by the DB
    //eslint-disable-next-line
  }, [userId] )
  
  return (
    <>
      {isError ? <Error /> :
        <div className="row py-5 px-4">
          <div className="col-md-7 mx-auto">
    
            {/* <!-- Profile widget --> */}
    
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="d-flex align-items-end profile-head">
                  <div className="profile mr-3"><img src={user.image} alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
                  </div>


                  <div className="d-flex-body mb-5 text-white">
                    <h4 className="profile-tit text-uppercase mt-0 mb-0 ms-3">{user.displayName}</h4>
                    <p className="profile-location text-capitalize small mb-4">
                      <i className="fas fa-map-marker-alt mr-2 ms-3"></i>{user.location}</p>
                  </div>
                </div>
              </div>
              <div className="bg-light p-3 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{user.memories.length}</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Memories</small>
                  </li>
              
                </ul>
              </div>
              <div className="px-5 py-1">
                <h5 className="pro-title text-capitalizemb-0">About</h5>
                <div className="p-3 rounded shadow-sm bg-light">
                  <p className="font-italic mb-0"> {user.about}</p>
                  <br></br>
                </div>
              </div>
              <div className="py-1 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="pro-title text-capitalize mb-0 ms-4">Recent Memories</h5>
              
                  <div className="group-buttons">
                    <button>
                      <Link to={'/profile/edit'} className={`btn ${buttonStyle.default} btn-sm justify-content-end`}>Edit Profile</Link>
                    </button>
              
                    <button>
                      <Link to={'/trips/new'} className={`btn ${buttonStyle.default} btn-sm me-3`}>Create New Memory</Link>
                    </button>
                  </div>
                </div>
                <div className="container pg-index">
                  <div className="gy-2 row row-cols-3">
                    {memoriesArray.map((memory => {
                      return (
                        <Link key={memory._id} to={`/memories/${memory._id}`} >
                          <div className="profileImgGal col-lg-12 mb-2 pr-lg-1">
                            <img src={memory.image} alt="" className="img-fluid rounded shadow-sm"/>
                          </div> 
                        </Link>
                      )
                    }))}
                  </div>
                </div> 
              </div>

            </div>
          </div>
        </div>
      }
    </>
  )
}
    
export default Profile
