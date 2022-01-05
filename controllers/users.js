import { NotFound } from '../lib/errors.js'
import Users from '../models/user-models.js'


async function usersIndex (_req, res) {
  const user = await Users.find()
  return res.status(200).json(user)
}

async function userShow (req, res, next) {
  const { userId } = req.params
  try {
    const userToFind = await Users.findById(userId)
    if (!userToFind) {
      throw new NotFound()
    }
    return res.status(200).json(userToFind)
  } catch (err) {
    next(err)
  }
}

async function userCreate(req, res, next) {
  try {
    const addUser = await Users.create(req.body)
    return res.status(200).json(addUser)
  } catch (err) {
    next(err)
  }
}

async function userDelete (req, res, next) {
  const { userId } = req.params
  try {
    const userToDelete = await Users.findById(userId)
    if (!userToDelete) {
      throw new NotFound()
    }
    await userToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


export default {
  index: usersIndex,
  show: userShow,
  create: userCreate,
  delete: userDelete,
}

// User schema
// {
// 	"username": "I am new here",
// 	"email": "newhere@",
// 	"password": "pass"
// }