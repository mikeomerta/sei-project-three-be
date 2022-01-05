import dotenv from 'dotenv'

dotenv.config()

export const dbURI = process.env.MONGODB_URI

export const port = 4000

