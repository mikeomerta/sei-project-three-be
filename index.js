import express from 'express'
import { port } from './config/environment.js'
import { connectToDB } from './db/helpers.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandling.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)


async function startServer() {
  try {
    await connectToDB()
    console.log('🤖 You are connected')
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🤖 There is an error happening')
    console.log(err)
  }
}

startServer()

