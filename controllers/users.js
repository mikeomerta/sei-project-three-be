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


export default {
  index: usersIndex,
  show: userShow,
}

// User schema
// {
// 	"username": "I am new here",
// 	"email": "newhere@",
// 	"password": "pass"
// }