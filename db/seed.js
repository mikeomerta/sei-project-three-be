import { connectToDB, disconnectDB, truncateDB } from './helpers.js'
import Projects from '../models/project-models.js'
import Users from '../models/user-models.js'
import projectData from './data/projects.js'


async function seed() {
  try {
    await connectToDB()
    console.log('🤖 Databse Connected')

    await truncateDB()
    console.log('🤖 Data Dropped')

    // Adding an admin user into the seed
    const user = await Users.create({
      username: 'admin',
      email: 'admin@email',
      password: 'pass',
      passwordConfirmation: 'pass',
    })
    console.log('🤖 Admin user created')

    // Creating a new array by copying the projects seed array and adding the admin user to each object
    const projectsWithUsersAdded = projectData.map(project => {
      project.addedBy = user
      return project
    })

    // Adding the projects with the admin user name to the seed
    const projects = await Projects.create(projectsWithUsersAdded)
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