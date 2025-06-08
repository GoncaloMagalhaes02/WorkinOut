import { Router } from "express";
import { createComment } from '../controllers/comments.js';
import { getCommentsByPost } from '../controllers/comments.js';


const CommentsRoutes = Router();

CommentsRoutes.post('/createComment', createComment);

CommentsRoutes.get('/getCommentByPost/:post_id', getCommentsByPost);

export default CommentsRoutes;