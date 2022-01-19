import { Link } from 'react-router-dom'

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}


function TripCardSmall ({ trip, coloredBorder }) {
  // console.log(coloredBorder)
  // console.log(trip.lineColor)
  return (
    <div 
      className="show-small-container" 
    >
      <Link 
        to={`/trips/${trip._id}`}
        className=" d-flex flex-column placebook-form shadow rounded m-2 bg-light"
        // style={coloredBorder && `borderColor=${trip.lineColor}`}  //comment this out to get the page working!
      >
        {/* //todo : replace with trip summary image*/}
        <div className="row">
          <div className="pt-3 pb-2 cover mb-1">
            <h5 className="text-center mb-0">{trip.title}</h5>
          </div>
        </div>
        <div className="row text-center">
          <div className="col text-center mb-0">
            <div>
              {[
                [trip.countryVisited, 'In:'], 
                [randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString(), 'On:']
              ].map(field=>(
                <div key={field[0]} className="row text-center mb-0">
                  <h6 className="text-center w-4em pr-0 mr-0 mb-0">{field[1]}</h6>
                  <p className="col text-center pl-0 ml-0 mb-0">{field[0]}</p>
                </div>  
              ))}
              <div className="row text-center mb-0 mt-0 pt-0 pb-0">
                <h6 >I remember:</h6>
                <p >{trip.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TripCardSmall