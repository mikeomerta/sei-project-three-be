import express from 'express'
import projects from '../controllers/projects.js'
import users from '../controllers/users.js'

const router = express.Router()

// PROJECTS routes
router.route('/projects')
  .get(projects.index)
  .post(projects.create)

router.route('/projects/:projectId')
  .get(projects.show)
  .delete(projects.delete)

// USER routes
router.route('/users')
  .get(users.index)
  .post(users.create)

router.route('/users/:userId')
  .get(users.show)
  .delete(users.delete)


export default router