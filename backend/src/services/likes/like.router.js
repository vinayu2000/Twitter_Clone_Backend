import express from 'express';
import { LikeController } from './like.controller.js';

const router = express.Router();

router.route('/:id').get([LikeController.likeCountController])
router.route('/post/:id').get([LikeController.getLikesByPostController])

export {router as LikeRouterService}