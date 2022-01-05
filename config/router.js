import express from 'express'
import projects from '../controllers/projects.js'

const router = express.Router()

router.route('/projects')
  .get(projects.index)
  .post(projects.create)

router.route('/projects/:projectId')
  .get(projects.show)
  .delete(projects.delete)


export default router