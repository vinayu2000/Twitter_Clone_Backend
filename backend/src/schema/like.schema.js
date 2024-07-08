import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  postId: {
    type: String,
    required: true
  },
  likedBy: [{
    type: String
  }],
  likesCount: {
    type: Number,
    default: 0
  }
})

likeSchema.index({ postId: 1 }, { unique: true, name: 'unique_post' })
const Like = model('like',likeSchema)
export {Like,likeSchema}