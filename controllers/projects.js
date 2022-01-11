import { NotFound, Unauthorized } from '../lib/errors.js'
import Projects from '../models/project-models.js'


async function projectsIndex (_req, res) {
  const projects = await Projects.find().populate('addedBy').populate('comments.addedBy')
  return res.status(200).json(projects)
}

async function projectShow (req, res, next) {
  const { projectId } = req.params
  try {
    const projectToFind = await Projects.findById(projectId).populate('addedBy').populate('comments.addedBy')
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

async function projectEdit (req, res, next) {
  req.body.addedBy = req.currentUser
  const { projectId } = req.params
  try {
    const projectToEdit = await Projects.findById(projectId)
    if (!projectToEdit) {
      throw new NotFound()
    }
    if (!projectToEdit.addedBy.equals(req.currentUser)) {
      throw new Unauthorized()
    }
    Object.assign(projectToEdit, req.body)
    await projectToEdit.save()
    return res.status(202).json({ message: `Project updated ${projectToEdit}` })
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'Error') {
      return res.status(404).json({ message: 'Not Found' })
    }
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
  edit: projectEdit,
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