import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'

import createConnection from './connect'
import clientsRouter from './routes/clientsRouter'
import providersRouter from './routes/providersRouter'
import config from './config'

const { port } = config
const dev = process.env.NODE_ENV !== 'production'

createConnection()

const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Practical test application',
  },
  host: 'localhost:8080',
  basePath: '/',
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()
app.use(helmet())
app.use(cors())
if (!dev) {
  app.use(compression())
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/clients', clientsRouter)
app.use('/providers', providersRouter)

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err,
  })
})

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
})
