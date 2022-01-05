import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  wallet: { type: Number },
  likedCategories: { type: String },
})

userSchema.plugin(mongooseUniqueValidator)
export default mongoose.model('User', userSchema)