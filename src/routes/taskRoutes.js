import express from "express";
import {
	getAllTasks,
	getTaskById,
	createNewTask,
	deleteTaskById,
	updateTaskById,
	finishTaskById,
} from "../controller/taskController.js";
import { createNewTaskValidateFields } from "../middleware/taskValidate.js";

const app = express.Router();

// Rotas GET
app.get("/", getAllTasks);
app.get("/:id", getTaskById);

// Rotas POST
app.post("/", createNewTaskValidateFields(["title", "description", "status"]), createNewTask);

// Rotas Delete
app.delete("/:id", deleteTaskById);

// Rotas Update
app.put("/:id", updateTaskById);
app.patch("/:id", finishTaskById);

export default app;
