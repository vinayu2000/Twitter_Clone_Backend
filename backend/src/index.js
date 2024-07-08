import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { databaseConnection } from './database/database.connection.js';
import { AuthRouterService } from './services/auth/auth.router.js';
import { PostRouterService } from './services/posts/post.router.js';
import { AuthController } from './services/auth/auth.controller.js';
import { LikeRouterService } from './services/likes/like.router.js';
import { CommentRouterService } from './services/comments/comment.router.js';

const app = express()
const port = 6106;

databaseConnection()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use('/auth', AuthRouterService)
app.use(AuthController.validateToken)
app.use('/post',PostRouterService)
app.use('/like',LikeRouterService)
app.use('/comment',CommentRouterService)

app.listen(port, () => {
    console.log('Server listening to the port', port);
})