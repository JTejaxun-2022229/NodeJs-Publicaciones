import { Router } from 'express'
import { createPost, deletePost, getPostDetails, getPosts, getUserPosts, updatePost } from './post.controller.js'
import verifyToken from '../../helpers/verifyToken.js'

const router = Router()

router.post(

    "/create",
    verifyToken,
    createPost
)

router.get(

    "/",
    getPosts
)

router.get(

    "/user/:userId",
    getUserPosts
)

router.get(

    "/:id",
    getPostDetails
)

router.put(

    "/:id",
    verifyToken,
    updatePost
)

router.delete(
    
    "/:id", 
    verifyToken, 
    deletePost
)

export default router