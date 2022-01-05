import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectToDB() {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
export function truncateDB(){
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection
    const promises = Object.keys(collections).map(collection => {
      return mongoose.connection.collection(collection).deleteMany({})
    })
    return Promise.all(promises)
  }
}
export function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}