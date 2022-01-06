import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user-models.js'
import { Unauthorized } from './errors.js'


async function secureRoute(req, _res , next) {
  try {
    // find the token in the header on a key called authorization
    if (!req.headers.authorization) {
      throw new Unauthorized()
    }

    // this bit takes off the 'Bearer ' (including space)
    const token = req.headers.authorization.replace('Bearer ', '')

    // decoding the token ('.sign' to create and '.verify' to deal with incoming).  Once decoded, if token is valid and secret is correct it will then give you the payload.
    const payload = jwt.verify(token, secret)

    // sub was created in the controller, .sub gives us the user's ID
    const user = await User.findById(payload.sub)

    if (!user) {
      throw new Unauthorized()
    }

    // added currentUser as a NEW KEY, so we can pass this down the funnel within the 'req' object.  It shows that the person is signed in and we can use their ID.
    req.currentUser = user._id

    next()
  } catch (err) {
    next(err)
  }
}

export default secureRoute