import axios from 'axios'

// import * as env from 'env'
// const process = { env }

const hostUrl = process.env.REACT_APP_CLOUDINARY_URL //'https://api.cloudinary.com/v1_1/team-mad/image/upload'
const imagePresets = {
  memory: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_MEMORY,// 'PB-memory-image',
  profile: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE, //'PB-profile-image',
}

function cloudinaryUpload (presetName, url, image, presets = imagePresets) {
  const uploadPreset = presets[presetName]
  if (!uploadPreset) throw new Error('No Cloudinary Preset')

  const data = new FormData()
  data.append('file', image)
  data.append('upload_preset', uploadPreset)
  
  const hostedUrl = axios.post(url, data).then(res=> res.data.url)

  return hostedUrl
}

export function uploadImageMemory (image) {
  return cloudinaryUpload('memory', hostUrl, image)
}

export function uploadImageProfile (image) {
  return cloudinaryUpload('profile', hostUrl, image)
}