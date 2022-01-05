import Projects from '../models/project-models.js'


async function projectsIndex (_req, res) {
  const projects = await Projects.find()
  return res.status(200).json(projects)
}

async function projectShow (req, res) {
  const { projectId } = req.params
  try {
    const projectToFind = await Projects.findById(projectId)
    if (!projectToFind) {
      console.log('🤖 Nothing Found')
      throw new Error()
    }
    return res.status(200).json(projectToFind)
  } catch (err) {
    console.log('Error', err)
    return res.status(404).json({ message: 'Not Found' })
  }
}

async function projectCreate (req, res) {
  try {
    const createdProject = await Projects.create(req.body)
    return res.status(200).json(createdProject)
  } catch (err) {
    console.log('Not created', err)
    return res.status(422).json(err)
  }
}

async function projectDelete (req, res) {
  const { projectId } = req.params
  try {
    const projectToDelete = await Projects.findById(projectId)
    if (!projectToDelete) {
      console.log('🤖 Nothing Found')
      throw new Error()
    }
    await projectToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('Error', err)
    return res.status(404).json({ message: 'Not Found' })
  }
}

export default {
  index: projectsIndex,
  show: projectShow,
  create: projectCreate,
  delete: projectDelete,
}


// Schema Layout
// {
//   "projectTitle": 
//   "primaryDescription": 
//   "secondaryDescription": 
//   "primaryImage": 
//   "secondaryImage": 
//   "categoryTag": 
// }