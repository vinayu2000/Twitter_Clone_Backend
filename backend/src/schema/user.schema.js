import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.index({ email: 1 }, { unique: true, name: 'unique_email' })
const User = model('user',userSchema)
export {User, userSchema}