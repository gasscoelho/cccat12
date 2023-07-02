import express from 'express'
import Ride from './Ride'

const app = express()

app.use(express.json())

app.post('/calculate_ride', (req, res) => {
  try {
    const ride = new Ride()
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date))
    }
    const price = ride.calculate()
    res.json({ price })
  } catch (e) {
    if (e instanceof Error) {
      res.status(422).send(e.message)
    } else {
      res.status(500).send('An unknown error occurred.')
    }
  }
})

app.listen(3000)
