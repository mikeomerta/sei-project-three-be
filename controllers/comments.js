import Projects from '../models/project-models.js'
import { NotFound, Unauthorized } from '../lib/errors.js'


async function projectCommentAdd(req, res, next) {
  req.body.addedBy = req.currentUser
  console.log('REQ', req.body)
  const { projectId } = req.params
  try {
    const addProjectComment = await Projects.findById(projectId)
    if (!addProjectComment) {
      throw new NotFound()
    }
    addProjectComment.comments.push(req.body)
    await addProjectComment.save()
    console.log('COMMENT', addProjectComment)
    return res.status(201).json(addProjectComment)
  } catch (err) {
    next(err)
  }
}

async function projectFavourite(req, res, next) {
  req.body.addedBy = req.currentUser
  const { projectId } = req.params
  try {
    const getProject = await Projects.findById(projectId)
    if (!getProject) {
      throw new NotFound()
    }
    const userId = req.currentUser._id
    if (getProject.favouritedBy.includes(userId)) {
      getProject.favouritedBy.remove(userId)
    } else {
      getProject.favouritedBy.push(userId)
    }
    await getProject.save()
    return res.status(202).json(getProject)
  } catch (err) {
    next(err)
  }
}
// async function getSingleComment(req, res, next) {
//   const { projectId, commentId } = req.params
//   try {
//     const getTheProject = await Projects.findById(projectId)
//     if (!getTheProject) {
//       throw new NotFound()
//     }
//     const getTheComment = await getTheProject.comments.id(commentId).populate('addedBy')
//     if (!getTheComment) {
//       throw new NotFound()
//     }
//     return res.status(201).json(getTheComment)
//   } catch (err) {
//     next(err)
//   }
// }

async function projectCommentDelete(req, res, next) {
  const { projectId, commentId } = req.params
  try {
    const project = await Projects.findById(projectId)
    if (!project) {
      throw new NotFound()
    }
    const projectCommentToDelete = project.comments.id(commentId)
    if (!projectCommentToDelete) {
      throw new NotFound()
    }
    if (!projectCommentToDelete.addedBy.equals(req.currentUser)) {
      throw new Unauthorized()
    }
    projectCommentToDelete.remove()
    await project.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  add: projectCommentAdd,
  favourite: projectFavourite,
  delete: projectCommentDelete,
}