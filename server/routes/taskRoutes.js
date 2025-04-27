import { Router } from "express";
import taskController from "../controllers/taskController.js";
import passport from '../config/passport.js'

const router = Router()

router.post('/create-task',passport.authenticate('jwt',{session:false}),taskController.createTask)
router.get('/get-task',passport.authenticate('jwt',{session:false}),taskController.getTasks)
router.put('/update-task/:id',passport.authenticate('jwt',{session:false}),taskController.updateTask)
router.delete('/delete-task/:id',passport.authenticate('jwt',{session:false}),taskController.deleteTask)

export default router