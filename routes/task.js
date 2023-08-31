import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteTask, myTask, newTask, updateTask } from "../controllers/task.js";

const router = express.Router()

router.post("/newTask", isAuthenticated, newTask)

router.get("/myTask", isAuthenticated, myTask)

router.route("/:id").put( isAuthenticated,updateTask).delete( isAuthenticated,deleteTask)

export default router