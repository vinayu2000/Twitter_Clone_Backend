import { Schema, model } from "mongoose";

const postSchema = new Schema({
  postedBy: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  post: {
    type: String,
    default: () => null
  },
  tweet: {
    type: String,
    default: () => null
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
})

const Post = model('post', postSchema)
export { Post, postSchema }