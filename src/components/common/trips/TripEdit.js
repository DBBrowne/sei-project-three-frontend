import { useState, useEffect } from 'react'
import { tripGetById, tripEdit } from '../../../lib/api'
import { useParams } from 'react-router-dom'

import RenderMap from '../maps/RenderMap'
import Error from '../Error'
import MemoryCreate from '../memories/MemoryCreate'
import MemorySmall from '../memories/MemorySmall'

const maxLengthTitle = 50
const maxLengthNotes = 300
const initialState = {
  title: '',
  notes: '',
  countryVisited: '',
  dateStarted: '',
  dateFinished: '',
  memories: [],
}

function TripEdit () {
  const [formData, setFormData] = useState(initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState(initialState)
  const { tripId } = useParams()
  const [isError, setIsError] = useState(false)
  // populate initial data

  const refreshFormDataFromApi = async ()=>{
    try {
      const getTripRes = await tripGetById(tripId)
      const newFormData = { ...formData,...getTripRes.data }
      setFormData(newFormData)
    } catch (err){
      setIsError(true)
    }
  }

  useEffect(()=>{
    (async ()=>{
      await refreshFormDataFromApi()
    })()
    // Do NOT want this hook to re-render on formData change, therefore accept non-exhaustive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId])
  
  const handleChange = e =>{
    const value = e.target.value
    // if user is editing limited field and exceeds length, do not accept new characters.
    // improves UX and ensures form can always be submitted so that updating memories does not get blocked by over-length text fields
    // TODO: release lock on notes length to make writing easier, but cut off over-length writing on submit?
    if (
      (e.target.name === 'title' &&
      e.target.value.length > maxLengthTitle) ||
      (e.target.name === 'notes' &&
      e.target.value.length > maxLengthNotes)
    ) {
      return
    }
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      const res = await tripEdit(tripId, formData)
      console.log('Editing return:',res)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const addNewMemoryToTrip = async (newMemoryId) =>{
    try {
      const newFormData = { 
        ...formData, 
        memories: [...formData.memories, newMemoryId], 
      }
      await tripEdit(tripId, newFormData)
      refreshFormDataFromApi()
    } catch (err){
      setIsError(true)
    }
  }
  const updateClientsideMemory = (index) => {
    return function (newMemoryData) {
      formData.memories[index] = newMemoryData
      setFormData({ ...formData })
    }
  }

  return (
    <section className="section">
      {isError ? (
        <Error />
      ) : (
        <div className='container-fluid row'>
          <form
            onSubmit={handleSubmit}
            className="col-4" 
            style={{ background: 'antiquewhite' }}
          >
            <div className="form-group">
              <label htmlFor="title"></label>
              <input 
                type="text"
                name="title"
                id="title"
                className={
                  `form-control ${formErrors.countryVisited ? 'border-danger' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {formErrors.title && <p className="text-danger">{formErrors.title}</p>  }
            </div>
            <div className="form-group">
              <label htmlFor="countryVisited">Where did you start?</label>
              <input 
                type="text" 
                name="countryVisited"
                id="countryVisited"
                className={
                  `form-control ${formErrors.countryVisited ? 'border-danger' : ''}`}
                value={formData.countryVisited}
                onChange={handleChange} 
              />
              {formErrors.countryVisited && <p className="text-danger">{formErrors.countryVisited}</p>  }
            </div>
            <div className="form-group">
              <label htmlFor="notes">Tell the world about your trip!</label>
              <textarea 
                name="notes"
                id="notes"
                className={
                  `form-control 
                ${(notesRemainingChars < 0 ||
                  formErrors.notes ) ? 'border-danger' : ''}`}
                value={formData.notes}
                onChange={handleChange} />
              <div className='row'>
                <small 
                  className={`form-text ml-auto text-end ${
                    (notesRemainingChars < 0) ? 'text-danger' : 'text-muted'
                  }`}
                >{notesRemainingChars} characters remaining</small>
              </div>
              {formErrors.notes && <p className="text-danger">{formErrors.notes}</p>  }
            </div>
            <div className='edit-trip-map-container'>
              <RenderMap arrayOfTrips={[formData]}/>
            </div>
            <div className='row'>
              <button 
                type="submit"
                className="btn btn-success ml-auto"
              >Save your trip</button>
            </div>
          </form>
          <div 
            className="col"
            style={{ background: 'khaki' }}>
            <div 
              className='d-flex flex-column'>
            </div>
            <div className='custom-memories-container row'>
              {Boolean(formData.memories.length) && 
              formData.memories.map(
                (memory, index) => (
                  <MemorySmall 
                    key={memory._id} 
                    memory={memory} 
                    updateClientsideMemory = {updateClientsideMemory(index)}
                  />
                )
              )}
            </div>
            <div className='create-memory-container row' >
              <MemoryCreate tripId={tripId} addNewMemoryToTrip={addNewMemoryToTrip}/>
            </div>
            {/* <div className='row'>
              <button type="button" 
                className="btn btn-primary"
                onClick={newMemoryEditor}
              >Add a Memory</button>
            </div> */}
          </div>
        </div>
      )}
    </section>
  )
}

export default TripEdit