import { Comment } from "../../schema/comment.schema.js";

const commentsController = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentedBy = req.user.email;
    const { comment } = req.body
    const post = await Comment.findOne({ postId });
    if (post) {
      post.comments.push({ user: commentedBy, comment });
      post.commentsCount = post.comments.length;
      await post.save();
      res.status(200).send({ STATUS: 'OK', data: post });
    } else {
      const newComment = await Comment.create({
        postId,
        commentsCount: 1,
        comments: {
          user: commentedBy,
          comment
        }
      });
      if (newComment) {
        res.status(200).send({ STATUS: 'OK', data: newComment });
      } else {
        res.status(400).send({ STATUS: 'failed', data: 'Failed to like post' });
      }
    }
  }
  catch (error) {
    console.log('Error while commenting post', error);
  }
}
const getCommentsController = async (req, res) => {
  try {
    const postId = req.params.id
    if (postId) {
      const comments = await Comment.findOne({ postId })
      if(comments) {
        res.send({STATUS:'OK',data:comments.comments})
      } else {
        res.status(404).send({STATUS:'failed',data:'comments not found'})
      }
    } else {
      res.status(400).send({STATUS:'failed',data:'bad request'})
    }
  }
  catch (error) {
    console.log('error while getting comments', error);
  }
}

export const CommentController = {
  commentsController,
  getCommentsController
}