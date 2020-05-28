
const express = require('express')
require('express-async-errors')
const app = express()
const blogRoutes = require('./controllers/blogRoutes')
const userRoutes = require('./controllers/userRoutes')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to DB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blog', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

