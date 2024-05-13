import { Router } from 'express'
import { createUser, login, logout, refetch } from './user.controller.js'


const router = Router()

router.post(

    "/register",
    createUser
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