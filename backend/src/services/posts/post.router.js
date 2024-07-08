import express from 'express';
import multer from 'multer';
import { PostController } from './post.controller.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'posts/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

router.route('/').get([PostController.getAllPostsController])
router.route('/user').get([PostController.getAllPostsOfUserController])
router.route('/').post(upload.single('file'), [PostController.createPostController])
router.route('/feedback').post([PostController.feedbackFormController])

export { router as PostRouterService }