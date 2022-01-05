import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  wallet: { type: Number },
  likedCategories: { type: String },
})

// this stops JSON showing passwords
userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
})

// checks pass versus pass confirmation, created as a virtual that's discarded once the pass has been saved.
// tells the schema it's about to get something that isn't in the schema from the FE (pass conf) and this is what to do with it
userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// checks pass and pass confirm match.  Pre Mongo validate stage.  The isModified bit means that it only happens if password is being modified and not if someone is updating their username or profile.
userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    // throws to the error handler
      this.invalidate('passwordConfirmation', 'Does Not Match')
    }
    next()
  })

// encripts / hashes the password before it is saved.  Only happns is password isModified, not user name etc.
// Need to donwload npm i bcrypt to use it
userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// compares incoming password when signing in.  Here we have CREATED a method we can now use on userSchema, which we will need when checking their password in valid on login
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}




userSchema.plugin(mongooseUniqueValidator)
export default mongoose.model('User', userSchema)