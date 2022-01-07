import Projects from '../models/project-models.js'
import { NotFound } from '../lib/errors.js'

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


export default {
  add: projectCommentAdd,
}