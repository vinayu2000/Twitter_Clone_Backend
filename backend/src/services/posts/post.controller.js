import { Comment } from "../../schema/comment.schema.js";
import { Feedback } from "../../schema/feedback.schema.js";
import { Like } from "../../schema/like.schema.js";
import { Post } from "../../schema/post.schema.js";

const createPostController = async (req, res) => {
  try {
    const { tweet } = req.body
    const post = req.file?.filename
    const postedBy = req.user.email
    const firstName = req.user.firstName
    const lastName = req.user.lastName
    if (postedBy && (post || tweet)) {
      const newPost = await Post.create({ postedBy,firstName,lastName, post, tweet })
      if (newPost._id) {
        res.status(201).send({ STATUS: 'OK', data: newPost })
      } else {
        res.status(400).send({ STATUS: 'failed', data: 'failed to create new post' })
      }
    } else {
      res.status(400).send({ STATUS: 'failed', data: 'bad request' })
    }
  }
  catch (error) {
    console.log('Error while creating post', error);
  }
}
const getLikesByPost = async (postId) => {
  try {
    if (postId) {
      const likes = await Like.findOne({ postId });
      return likes ? likes : 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.log('Error while getting likes', error);
    return 0;
  }
}
const getCommentsByPost = async (postId) => {
  try {
    if (postId) {
      const comments = await Comment.findOne({ postId });
      return comments ? comments : 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.log('Error while getting comments', error);
    return 0;
  }
}

const getAllPostsController = async (req, res) => {
  try {
    const allPosts = await Post.find().sort({ createdAt: -1 })
    if (allPosts.length > 0) {
      const postsWithLikes = await Promise.all(allPosts.map(async post => {
        7
        const likes = await getLikesByPost(post._id);
        const comments = await getCommentsByPost(post._id)
        return { ...post._doc, likes: likes ? likes.likesCount : 0, liked: likes.likedBy, comments: comments ? comments.commentsCount : 0 };
      }));
      res.status(200).send({ STATUS: 'OK', data: postsWithLikes })
    } else {
      res.status(404).send({ STATUS: 'failed', data: 'posts not found' })
    }
  }
  catch (error) {
    console.log('Error while getting all posts', error);
  }
}

const getAllPostsOfUserController = async (req, res) => {
  try {
    const postedBy = req.user.email
    const allPosts = await Post.find({ postedBy })
    if (allPosts.length > 0) {
      res.status(200).send({ STATUS: 'OK', data: allPosts })
    } else {
      res.status(404).send({ STATUS: 'failed', data: 'posts not found' })
    }
  }
  catch (error) {
    console.log('Error while getting all posts', error);
  }
}

const feedbackFormController = async (req, res) => {
  try {
    const { feedback } = req.body
    const user = req.user.email
    if (feedback) {
      const feedbackData = await Feedback.create({ user, feedback })
      if (feedbackData) {
        res.send({ STATUS: 'OK', data: feedbackData })
      } else {
        res.send({ STATUS: "failed", data: 'failed to create feedback' })
      }
    } else {
      res.send({ STATUS: "failed", data: 'feedback required' })
    }
  }
  catch (error) {
    console.log('error while taking feedback', error);
  }
}

export const PostController = {
  createPostController,
  getAllPostsController,
  getAllPostsOfUserController,
  feedbackFormController
}