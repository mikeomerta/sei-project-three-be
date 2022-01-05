import express from 'express'
import projects from '../controllers/projects.js'
import users from '../controllers/users.js'
import userAuth from '../controllers/auth.js'
// import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// PROJECTS routes
router.route('/projects')
  .get(projects.index)
  .post(projects.create)

router.route('/projects/:projectId')
  .get(projects.show)
  .delete(projects.delete)

// USER routes
// user auth routes
router.route('/register')
  .post(userAuth.register)

router.route('/login')
  .post(userAuth.login)

router.route('/users/:userId')
  // .put(userAuth.edit)
  .delete(userAuth.delete)

// user non-auth routes, such as show, index
router.route('/users')
  .get(users.index)

router.route('/users/:userId')
  .get(users.show)



export default router