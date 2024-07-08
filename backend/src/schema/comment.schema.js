import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  postId: {
    type: String,
    required: true
  },
  commentsCount:{
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: String,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => Date.now()
    }
  }]
})

commentSchema.index({ postId: 1 }, { unique: true, name: 'unique_post' })
const Comment = model('comment',commentSchema)
export {Comment,commentSchema}