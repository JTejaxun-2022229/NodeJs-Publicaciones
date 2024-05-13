import { Router } from 'express'
import { createUser, deleteUser, getUser, login, logout, refetch, updateUser } from './user.controller.js'
import verifyToken from '../../helpers/verifyToken.js'

const router = Router()

router.post(

    "/register",
    createUser
)

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

router.post(

    "/login",
    login
)

router.get(

    "/logout",
    logout
)

router.get(

    "/refetch",
    refetch
)

export default router