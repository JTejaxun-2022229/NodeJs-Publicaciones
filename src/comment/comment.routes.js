import { Router } from "express";
import { createComment, deleteComment, getComment, updatedComment } from './comment.controller.js'
import verifyToken from '../../helpers/verifyToken.js'

const router = Router();

router.post(

    "/create",
    verifyToken,
    createComment
)

router.get(

    "/post/:postId",
    getComment
)

router.put(

    "/:id", 
    verifyToken,
    updatedComment
)

router.delete(
    
    "/:id", 
    verifyToken, 
    deleteComment
)

export default router