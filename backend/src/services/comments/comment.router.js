import express from 'express';
import { CommentController } from './comment.controller.js';

const router = express.Router()

router.route('/:id').get([CommentController.getCommentsController])
router.route('/:id').post([CommentController.commentsController])

export {router as CommentRouterService}