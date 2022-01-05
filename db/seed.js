import { connectToDB, disconnectDB, truncateDB } from './helpers.js'
import Projects from '../models/project-models.js'
import projectData from './data/projects.js'

async function seed() {
  try {
    await connectToDB()
    console.log('🤖 Databse Connected')

    await truncateDB()
    console.log('🤖 Data Dropped')

    // Adding Projects

    const projects = await Projects.create(projectData) 
    console.log(`🤖 ${projects.length} Projects added`)

    console.log('🤖 Everything is now done')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  await disconnectDB()
  console.log('🤖 Goodbye')
}

seed()