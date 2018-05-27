import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'

import createConnection from './connect'
import config from './config'

const { port } = config
const dev = process.env.NODE_ENV !== 'production'

createConnection()

const app = express()
app.use(helmet())
app.use(cors())
if (!dev) {
  app.use(compression())
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/', (req, res) => {
  res.send('Wow! Works!')
})

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
})
