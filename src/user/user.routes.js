import { Router } from 'express'
import { createUser, deleteUser, getUser, login, logout, refetch, updateUser } from './user.controller.js'
import verifyToken from '../../helpers/verifyToken.js'

const router = Router()

router.get(

    "/:id",
    getUser
)

router.put(

    "/:id",
    verifyToken,
    updateUser
)

router.delete(

    "/:id", 
    verifyToken, 
    deleteUser
)

export default router