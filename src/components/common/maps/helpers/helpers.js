function randomIntWithinRange ({ max, min }){
  const randomIntForAddition = Math.floor(Math.random() * (max - min))
  return (min + randomIntForAddition)
}

export function randomRGBA({
  redRange = { max: 255,min: 0 },
  greenRange = { max: 255,min: 0 },
  blueRange = { max: 255,min: 0 },
  alpha = 1 }
){
  return (
    `rgba(${randomIntWithinRange(redRange)}, ${randomIntWithinRange(greenRange)}, ${randomIntWithinRange(blueRange)}, ${alpha})`
  )
}