import { Router } from "express";
import userController from "../controllers/userController.js";


const router = Router()

router.post('/create-user',userController.createUser)
router.post('/login',userController.userLogin)
router.get('/authenticate',userController.authenticateUser)
router.post('/logout',userController.logOut)

export default router 