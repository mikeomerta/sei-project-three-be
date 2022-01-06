import { NotFound, Unauthorized } from '../lib/errors.js'
import Projects from '../models/project-models.js'


async function projectsIndex (_req, res) {
  const projects = await Projects.find().populate('addedBy')
  return res.status(200).json(projects)
}

async function projectShow (req, res, next) {
  const { projectId } = req.params
  try {
    const projectToFind = await Projects.findById(projectId).populate('addedBy')
    if (!projectToFind) {
      throw new NotFound()
    }
    return res.status(200).json(projectToFind)
  } catch (err) {
    next(err)
  }
}

async function projectCreate (req, res, next) {
  req.body.addedBy = req.currentUser
  try {
    const createdProject = await Projects.create(req.body)
    return res.status(200).json(createdProject)
  } catch (err) {
    next(err)
  }
}

async function projectDelete (req, res, next) {
  const { projectId } = req.params
  try {
    const projectToDelete = await Projects.findById(projectId)
    if (!projectToDelete) {
      throw new NotFound()
    }
    if (!projectToDelete.addedBy.equals(req.currentUser)){
      throw new Unauthorized()
    }
    await projectToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
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