import { Like } from "../../schema/like.schema.js";

const likeCountController = async (req, res) => {
  try {
    const postId = req.params.id;
    const likedBy = req.user.email;
    const post = await Like.findOne({ postId });
    if (post) {
      const userLiked = post.likedBy.includes(likedBy);
      if (userLiked) {
        post.likedBy = post.likedBy.filter(user => user !== likedBy);
        post.likesCount = post.likedBy.length;
        await post.save();
        return res.status(200).send({ STATUS: 'OK', data: post });
      } else {
        post.likedBy.push(likedBy);
        post.likesCount = post.likedBy.length;
        await post.save();
        return res.status(200).send({ STATUS: 'OK', data: post });
      }
    } else {
      const newLike = await Like.create({ postId, likesCount: 1, likedBy: [likedBy] });
      if (newLike) {
        res.status(200).send({ STATUS: 'OK', data: newLike });
      } else {
        res.status(400).send({ STATUS: 'failed', data: 'Failed to like post' });
      }
    }
  } catch (error) {
    console.log('Error while liking post', error);
    res.status(500).send({ STATUS: 'error', data: 'Internal Server Error' });
  }
};

const getLikesByPostController = async (req, res) => {
  try {
    const  postId  = req.params.id;
    if(postId) {
      const likes = await Like.findOne({postId})
      if(likes._id) {
        res.send({STATUS:'OK',data:likes.likesCount})
      } else {
        res.status(404).send({STATUS:'failed',data:'Likes not found'})
      }
    } else {
      res.status(400).send({STATUS:'failed',data:'PostId required to get likes'})
    }
  }
  catch (error) {
    console.log('Error while getting likes', error);
  }
}

export const LikeController = {
  likeCountController,
  getLikesByPostController
}