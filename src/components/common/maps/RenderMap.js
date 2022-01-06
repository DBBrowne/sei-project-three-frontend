import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

function getLocationArrayStats (array){
  const locationAggregates = array.reduce((acc, cur)=>{
    acc.lat += cur.lat
    acc.lng += cur.lng
    if (cur.lat > acc.latMax) acc.latMax = cur.lat
    if (cur.lat < acc.latMin) acc.latMin = cur.lat
    if (cur.lng > acc.lngMax) acc.lngMax = cur.lng
    if (cur.lng < acc.lngMin) acc.lngMin = cur.lng
    return acc
  }, { lat: 0, lng: 0 , latMax: -180, latMin: 180, lngMax: -180, lngMin: 180 })
  const count = array.length
  return { 
    lat: locationAggregates.lat / count, 
    lng: locationAggregates.lng / count , 
    latRng: locationAggregates.latMax - locationAggregates.latMin ,
    lngRng: locationAggregates.lngMax - locationAggregates.lngMin ,
  }
}

function RenderMap ({ 
  data, 
  center,
  initZoom,
}) {
  const locationStats = getLocationArrayStats(data.memories)
  if (!center){
    center = { lat: locationStats.lat, lng: locationStats.lng }
  }
  if (!initZoom) {
    // const latZoom = 2
    initZoom = 3
  }
  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.lng,
    zoom: initZoom,
  })

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        height="100%"
        width="100%"
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        {...viewport}
        onViewportChange={newViewport => setViewport(newViewport)}
      >
        {data.memories.map(location => (
          <Marker
            key={location.id}
            latitude={location.lat}
            longitude={location.lng}
          >
            <span role="img" aria-label="map-marker" className="marker">{'A'}</span>
          </Marker>
        ))}
        {/* <MapController onClick={handleNewLocation}/> */}
      </ReactMapGL>
    </div>
  )
}

export default RenderMap