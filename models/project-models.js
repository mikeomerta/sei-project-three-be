import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'


const projectCommentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 300 },
  microPay: { type: Number, min: 1 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
} , {
  timestamps: true,
})

const projectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true, maxlength: 150 },
  primaryDescription: { type: String, required: true, maxLength: 250 },
  secondaryDescription: { type: String, maxLength: 1000 },
  primaryImage: { type: String, required: true },
  secondaryImage: [{ type: String }],
  categoryTag: [{ type: String }],
  comments: [projectCommentSchema],
  favouritedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

projectSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Projects', projectSchema)